import { Mongo } from 'meteor/mongo';

const ClientPictures = new FS.Collection("client_pictures", {
  stores: [new FS.Store.GridFS("client_pictures")]
});

export default ClientPictures;
