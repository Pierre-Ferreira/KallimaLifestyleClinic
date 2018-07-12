import { Mongo } from 'meteor/mongo';

const ClientPaymentInfo = new Mongo.Collection('client_payment_info');

export default ClientPaymentInfo;
