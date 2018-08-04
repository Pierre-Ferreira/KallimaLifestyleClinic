import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const ClientBefAftPictures = new FilesCollection({
  collectionName: 'client_bef_aft_pictures',
  // storagePath: 'assets/app/uploads/client_bef_aft_pictures',
});

export default ClientBefAftPictures;
