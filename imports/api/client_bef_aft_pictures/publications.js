import { Meteor } from 'meteor/meteor';
import ClientBefAftPictures from './s3_picture_storage';

Meteor.publish('client_bef_aft_pictures.all', () => {
  return ClientBefAftPictures.collection.find({});
});
