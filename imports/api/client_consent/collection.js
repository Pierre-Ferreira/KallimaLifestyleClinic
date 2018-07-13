import { Mongo } from 'meteor/mongo';

const ClientConsent = new Mongo.Collection('client_consent');

export default ClientConsent;
