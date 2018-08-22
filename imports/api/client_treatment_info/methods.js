import { Meteor } from 'meteor/meteor';
import ClientTreatmentInfo from './collection';
import './hooks';

Meteor.methods({
  'client_treatment_info.fetch': (clientID) => {
    check(clientID, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Treatment Info not fetched. User not logged in.");
    } else {
      const clientTreatmentInfo = ClientTreatmentInfo.findOne({ clientID });
      console.log('clientID:', clientID);
      console.log('client_treatment_info.fetch:', clientTreatmentInfo);
      return clientTreatmentInfo;
    }
  },
  'client_treatment_info.update': (clientID, clientTreatmentInfo) => {
    console.log('clientTreatmentInfo:', clientTreatmentInfo)
    check(clientID, String);
    check(clientTreatmentInfo, {
      payNum: Number,
      date: String,
      treatmentType: String,
      otherInfo: String,
    });
    if (clientID.length === 0) throw new Meteor.Error(403, 'clientID is required');
    if (clientTreatmentInfo.payNum.length === 0 || clientTreatmentInfo.payNum === 0) throw new Meteor.Error(403, 'No. is required. Create new treatment.');
    if (clientTreatmentInfo.date.length === 0) throw new Meteor.Error(403, 'Date is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Treatment Info entry not updated. User not logged in.");
    } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(403, "Client's Treatment Info entry not updated. User is not authorized.");
    } else {
      // Check if the document for this ClientID already exists. If so UPDATE, else INSERT.
      const ClientTreatmentInfoDoc = ClientTreatmentInfo.findOne({ clientID });
      const ClientTreatmentInfoID = ClientTreatmentInfoDoc && ClientTreatmentInfoDoc._id;
      console.log('ClientTreatmentInfoID:', ClientTreatmentInfoID);
      if (ClientTreatmentInfoID) {
        // Remove all occurances of that payNum in the array.
        ClientTreatmentInfo.update(
          { clientID },
          {
            $pull: {
              client_treatment_info: {
                payNum: clientTreatmentInfo.payNum,
              },
            },
          },
        );
        clientTreatmentInfo.updatedAt = new Date();
        clientTreatmentInfo.updatedBy = Meteor.userId();
        clientTreatmentInfo.updatedByUsername = Meteor.user().username;
        // Re-insert the payNum back into the array and sort. Using UPSERT causes issues.
        ClientTreatmentInfo.update(
          { clientID },
          {
            $push: {
              client_treatment_info: {
                $each: [clientTreatmentInfo],
                $sort: { payNum: 1 },
              },
            },
          },
        );
        console.log('Updated client_treatment_info: ', ClientTreatmentInfo.findOne({ clientID }));
      } else {
        clientTreatmentInfo.updatedAt = new Date();
        clientTreatmentInfo.updatedBy = Meteor.userId();
        clientTreatmentInfo.updatedByUsername = Meteor.user().username;
        ClientTreatmentInfo.insert({
          clientID,
          client_treatment_info: [clientTreatmentInfo],
        });
        console.log('Insert client_treatment_info: ', ClientTreatmentInfo.findOne({ clientID }));
      }
      return ClientTreatmentInfo.findOne({ clientID }).client_treatment_info;
    }
  },
});
