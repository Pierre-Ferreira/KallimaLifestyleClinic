import { Meteor } from 'meteor/meteor';
import ClientWeightInfo from './collection';
import './hooks';

Meteor.methods({
  'client_weight_info.fetch': (clientID) => {
    check(clientID, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Weight Info not fetched. User not logged in.");
    } else {
      const clientWeightInfo = ClientWeightInfo.findOne({ clientID });
      console.log('clientID:', clientID);
      console.log('client_weight_info.fetch:', clientWeightInfo);
      return clientWeightInfo;
    }
  },
  'client_weight_info.update': (clientID, clientWeightInfo) => {
    console.log('clientWeightInfo:', clientWeightInfo)
    check(clientID, String);
    check(clientWeightInfo, {
      week: Number,
      date: String,
      weight: String,
      chest: String,
      middle: String,
      bum: String,
      legUp: String,
      legLow: String,
      arm: String,
      // neck: String,
      // ankle: String,
    });
    if (clientID.length === 0) throw new Meteor.Error(403, 'clientID is required');
    if (clientWeightInfo.week.length === 0 || clientWeightInfo.week === 0) throw new Meteor.Error(403, 'Week is required. Create new entry.');
    if (clientWeightInfo.date.length === 0) throw new Meteor.Error(403, 'Date is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Weight Info entry not updated. User not logged in.");
    } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(403, "Client's Weight Info entry not updated. User is not authorized.");
    } else {
      // Check if the document for this ClientID already exists. If so UPDATE, else INSERT.
      const ClientWeightInfoDoc = ClientWeightInfo.findOne({ clientID });
      const ClientWeightInfoID = ClientWeightInfoDoc && ClientWeightInfoDoc._id;
      console.log('ClientWeightInfoID:', ClientWeightInfoID);
      if (ClientWeightInfoID) {
        // Remove all occurances of that week in the array.
        ClientWeightInfo.update(
          { clientID },
          {
            $pull: {
              client_weight_info: {
                week: clientWeightInfo.week,
              },
            },
          },
        );
        clientWeightInfo.updatedAt = new Date();
        clientWeightInfo.updatedBy = Meteor.userId();
        // Re-insert the week back into the array and sort. Using UPSERT causes issues.
        ClientWeightInfo.update(
          { clientID },
          {
            $push: {
              client_weight_info: {
                $each: [clientWeightInfo],
                $sort: { week: 1 },
              },
            },
          },
        );
        console.log('Updated client_weight_info: ', ClientWeightInfo.findOne({ clientID }));
      } else {
        ClientWeightInfo.insert({
          clientID,
          client_weight_info: [clientWeightInfo],
        });
        console.log('Insert client_weight_info: ', ClientWeightInfo.findOne({ clientID }));
      }
      return ClientWeightInfo.findOne({ clientID }).client_weight_info;
    }
  },
});
