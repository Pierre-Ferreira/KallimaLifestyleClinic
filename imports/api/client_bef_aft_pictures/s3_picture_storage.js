import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import stream from 'stream';

import S3 from 'aws-sdk/clients/s3'; /* http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html */
/* See fs-extra and graceful-fs NPM packages */
/* For better i/o performance */
import fs from 'fs';

/* Example: S3='{"s3":{"key": "xxx", "secret": "xxx", "bucket": "xxx", "region": "xxx""}}' meteor */
if (process.env.S3) {
  Meteor.settings.s3 = JSON.parse(process.env.S3).s3;
}

const pictures_s3_conf = Meteor.settings.s3 || {};
const bound  = Meteor.bindEnvironment((callback) => {
  return callback();
});

/* Check settings existence in `Meteor.settings` */
/* This is the best practice for app security */
let ClientBefAftPictures = '';
console.log("pictures_s3_conf:",pictures_s3_conf)
console.log("pictures_s3_conf.key:",pictures_s3_conf.key)
console.log("pictures_s3_conf.secret:",pictures_s3_conf.secret)
console.log("pictures_s3_conf.bucket:",pictures_s3_conf.bucket)
console.log("pictures_s3_conf.region:",pictures_s3_conf.region)
console.log("Meteor.settings:",Meteor.settings)

if (pictures_s3_conf && pictures_s3_conf.key && pictures_s3_conf.secret && pictures_s3_conf.bucket && pictures_s3_conf.region) {
  // Create a new S3 object
  const s3 = new S3({
    secretAccessKey: pictures_s3_conf.secret,
    accessKeyId: pictures_s3_conf.key,
    region: pictures_s3_conf.region,
    // sslEnabled: true, // optional
    httpOptions: {
      timeout: 6000,
      agent: false
    }
  });
  console.log('S3 Setup.')
  // Declare the Meteor file collection on the Server
  ClientBefAftPictures = new FilesCollection({
    debug: false, // Change to `true` for debugging
    storagePath: 'assets/app/uploads/client_bef_aft_pictures',
    // assets/app/uploads/Images
    collectionName: 'client_bef_aft_pictures',
    // Disallow Client to execute remove, use the Meteor.method
    allowClientCode: false,

    // Start moving files to AWS:S3
    // after fully received by the Meteor server
    onAfterUpload(fileRef) {
      console.log(`Uploading to S3 Picture:'${fileRef._id}`);
      // Run through each of the uploaded file
      _.each(fileRef.versions, (vRef, version) => {
        // We use Random.id() instead of real file's _id
        // to secure files from reverse engineering on the AWS client
        const filePath = `Bef_After_Pictures/${fileRef._id}-${version}.${fileRef.extension}`;
        console.log(`filePath to S3 Picture:'${filePath}`);
        // Create the AWS:S3 object.
        // Feel free to change the storage class from, see the documentation,
        // `STANDARD_IA` is the best deal for low access files.
        // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
        // Body is the file stream we are sending to AWS
        s3.putObject({
          // ServerSideEncryption: 'AES256', // Optional
          StorageClass: 'STANDARD',
          Bucket: pictures_s3_conf.bucket,
          Key: filePath,
          Body: fs.createReadStream(vRef.path),
          ContentType: vRef.type,
        }, (error) => {
          bound(() => {
            if (error) {
              console.error(`S3 upload Error1:${error}`);
            } else {
              // Update FilesCollection with link to the file at AWS
              const upd = { $set: {} };
              upd['$set']['versions.' + version + '.meta.pipePath'] = filePath;

              this.collection.update({
                _id: fileRef._id
              }, upd, (updError) => {
                if (updError) {
                  console.error(`S3 upload Error2:${updError}`);
                } else {
                  // Unlink original files from FS after successful upload to AWS:S3
                  console.log(`Unlinking fileRef:${fileRef}`);
                  this.unlink(this.collection.findOne(fileRef._id), version);
                }
              });
            }
          });
        });
      });
    },


    // Intercept access to the file
    // And redirect request to AWS:S3
    interceptDownload(http, fileRef, version) {
      let path;

      if (fileRef && fileRef.versions && fileRef.versions[version] && fileRef.versions[version].meta && fileRef.versions[version].meta.pipePath) {
        path = fileRef.versions[version].meta.pipePath;
      }

      if (path) {
        // If file is successfully moved to AWS:S3
        // We will pipe request to AWS:S3
        // So, original link will stay always secure

        // To force ?play and ?download parameters
        // and to keep original file name, content-type,
        // content-disposition, chunked "streaming" and cache-control
        // we're using low-level .serve() method
        const opts = {
          Bucket: pictures_s3_conf.bucket,
          Key: path
        };

        if (http.request.headers.range) {
          const vRef  = fileRef.versions[version];
          let range   = _.clone(http.request.headers.range);
          const array = range.split(/bytes=([0-9]*)-([0-9]*)/);
          const start = parseInt(array[1]);
          let end     = parseInt(array[2]);
          if (isNaN(end)) {
            // Request data from AWS:S3 by small chunks
            end       = (start + this.chunkSize) - 1;
            if (end >= vRef.size) {
              end     = vRef.size - 1;
            }
          }
          opts.Range   = `bytes=${start}-${end}`;
          http.request.headers.range = `bytes=${start}-${end}`;
        }

        const fileColl = this;
        s3.getObject(opts, function (error) {
          if (error) {
            console.error(error);
            if (!http.response.finished) {
              http.response.end();
            }
          } else {
            if (http.request.headers.range && this.httpResponse.headers['content-range']) {
              // Set proper range header in according to what is returned from AWS:S3
              http.request.headers.range = this.httpResponse.headers['content-range'].split('/')[0].replace('bytes ', 'bytes=');
            }

            const dataStream = new stream.PassThrough();
            fileColl.serve(http, fileRef, fileRef.versions[version], version, dataStream);
            dataStream.end(this.data.Body);
          }
        });

        return true;
      }
      // While file is not yet uploaded to AWS:S3
      // It will be served file from FS
      return false;
    }
  });
  // console.log('ClientBefAftPictures:', ClientBefAftPictures)
  // Intercept FilesCollection's remove method to remove file from AWS:S3
  const _origRemove = ClientBefAftPictures.remove;
  ClientBefAftPictures.remove = function (search) {
    const cursor = this.collection.find(search);
    console.log('REMOVE INTERCEPTION.')
    cursor.forEach((fileRef) => {
      _.each(fileRef.versions, (vRef) => {
        if (vRef && vRef.meta && vRef.meta.pipePath) {
          // Remove the object from AWS:S3 first, then we will call the original FilesCollection remove
          s3.deleteObject({
            Bucket: pictures_s3_conf.bucket,
            Key: vRef.meta.pipePath,
          }, (error) => {
            bound(() => {
              if (error) {
                console.error(error);
              }
            });
          });
        }
      });
    });

    //remove original file from database
    _origRemove.call(this, search);
  };
} else {
  throw new Meteor.Error(401, 'Missing Meteor file settings');
}
export default ClientBefAftPictures;
