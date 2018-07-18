import { Meteor } from 'meteor/meteor';
import ClientPaymentInfo from './collection';
import './hooks';

Meteor.methods({
  'client_payment_info.fetch': (clientID) => {
    check(clientID, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Payment Info not fetched. User not logged in.");
    } else {
      const clientPaymentInfo = ClientPaymentInfo.findOne({ clientID });
      console.log('clientID:', clientID);
      console.log('client_payment_info.fetch:', clientPaymentInfo);
      return clientPaymentInfo;
    }
  },
  'client_payment_info.update': (clientID, clientPaymentInfo) => {
    console.log('clientPaymentInfo:', clientPaymentInfo)
    check(clientID, String);
    check(clientPaymentInfo, {
      payNum: Number,
      date: String,
      amount: String,
      payType: String,
      noOfWeeks: String,
      receiverName: String,
      otherInfo: String,
    });
    if (clientID.length === 0) throw new Meteor.Error(403, 'clientID is required');
    if (clientPaymentInfo.payNum.length === 0 || clientPaymentInfo.payNum === 0) throw new Meteor.Error(403, 'No. is required. Create new payment.');
    if (clientPaymentInfo.date.length === 0) throw new Meteor.Error(403, 'Date is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Payment Info entry not updated. User not logged in.");
    } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(403, "Client's Payment Info entry not updated. User is not authorized.");
    } else {
      // Check if the document for this ClientID already exists. If so UPDATE, else INSERT.
      const ClientPaymentInfoDoc = ClientPaymentInfo.findOne({ clientID });
      const ClientPaymentInfoID = ClientPaymentInfoDoc && ClientPaymentInfoDoc._id;
      console.log('ClientPaymentInfoID:', ClientPaymentInfoID);
      if (ClientPaymentInfoID) {
        // Remove all occurances of that payNum in the array.
        ClientPaymentInfo.update(
          { clientID },
          {
            $pull: {
              client_payment_info: {
                payNum: clientPaymentInfo.payNum,
              },
            },
          },
        );
        clientPaymentInfo.updatedAt = new Date();
        clientPaymentInfo.updatedBy = Meteor.userId();
        clientPaymentInfo.updatedByUsername = Meteor.user().username;
        // Re-insert the payNum back into the array and sort. Using UPSERT causes issues.
        ClientPaymentInfo.update(
          { clientID },
          {
            $push: {
              client_payment_info: {
                $each: [clientPaymentInfo],
                $sort: { payNum: 1 },
              },
            },
          },
        );
        console.log('Updated client_payment_info: ', ClientPaymentInfo.findOne({ clientID }));
      } else {
        clientPaymentInfo.updatedAt = new Date();
        clientPaymentInfo.updatedBy = Meteor.userId();
        clientPaymentInfo.updatedByUsername = Meteor.user().username;
        ClientPaymentInfo.insert({
          clientID,
          client_payment_info: [clientPaymentInfo],
        });
        console.log('Insert client_payment_info: ', ClientPaymentInfo.findOne({ clientID }));
      }
      return ClientPaymentInfo.findOne({ clientID }).client_payment_info;
    }
  },
});
