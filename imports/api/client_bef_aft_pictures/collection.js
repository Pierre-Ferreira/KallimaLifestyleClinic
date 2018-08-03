import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({ collectionName: 'Images' });
export default Images;

//
// const ClientConsent = new Mongo.Collection('client_consent');
//
// export default ClientConsent;
