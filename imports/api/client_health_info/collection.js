import { Mongo } from 'meteor/mongo';

const ClientHealthInfo = new Mongo.Collection('client_health_info');

export default ClientHealthInfo;
