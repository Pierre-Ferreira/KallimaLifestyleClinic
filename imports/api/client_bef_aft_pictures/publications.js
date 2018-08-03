import { Meteor } from 'meteor/meteor';
import UserFiles from './s3_picture_storage';

  console.log('ON THE SERVER YO!')
  Meteor.publish('files.images.all', () => {
    return UserFiles.collection.find({});
  });
