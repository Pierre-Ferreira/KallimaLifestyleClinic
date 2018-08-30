import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import moment from 'moment/moment';
import generateComponentAsPDF from '../../modules/server/generatePDFFromComp';
import ClientWeightInfoChartEmailTemplate from '../../ui/components/Templates/ClientWeightInfoChartEmailTemplate';
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
      otherInfo: String,
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
        clientWeightInfo.updatedByUsername = Meteor.user().username;
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
        clientWeightInfo.updatedAt = new Date();
        clientWeightInfo.updatedBy = Meteor.userId();
        clientWeightInfo.updatedByUsername = Meteor.user().username;
        ClientWeightInfo.insert({
          clientID,
          client_weight_info: [clientWeightInfo],
        });
        console.log('Insert client_weight_info: ', ClientWeightInfo.findOne({ clientID }));
      }
      return ClientWeightInfo.findOne({ clientID }).client_weight_info;
    }
  },
  'client_weight_info.email': (clientID, weightWeeklyEntriesArr, clientName) => {
    check(clientID, String)
    check(weightWeeklyEntriesArr, Array)
    check(clientName, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (weightWeeklyEntriesArr.length === 0) throw new Meteor.Error(403, 'client weight info is required');
    if (clientName.length === 0) throw new Meteor.Error(403, 'client Name is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Weight Info not fetched. User not logged in.");
    } else {
      console.log('weightWeeklyEntriesArr:', weightWeeklyEntriesArr)
      const fileName = `document_${clientID}.pdf`;
      generateComponentAsPDF({
        component: ClientWeightInfoChartEmailTemplate,
        props: { weightWeeklyEntriesArr },
        fileName,
        clientName,
      })
        .then((result) => {
          console.log('client_weight_info.email RESULT: ', result);
          try {
            console.log("INSIDE try sendEmail.")
            // const file = fs.readFileSync(path);
            // return new Buffer(file).toString('base64');
            const filePath = `${Meteor.rootPath}/tmp/${fileName}`;
            console.log('filePath:', filePath);
            const filePath2 = `${Meteor.absolutePath}/tmp/${fileName}`;
            console.log('filePath2:', filePath2);
            Email.send({
              to: 'pierre@tektite.biz',
              from: 'Hannah <therapyroom24@gmail.com>',
              replyTo: 'Hannah <therapyroom24@gmail.com>',
              subject: 'Kallima Weight Progress.',
              html: '<strong>Hi, attached is your up to date weight progress info!</strong>',
              attachments: [{
                filename: `Weight Info - ${moment(new Date()).format('DD-MM-YYYY')}.pdf`,
                path: filePath,
                contentType: 'pdf',
              }],
            });
            return result;
          } catch (exception) {
            console.log("INSIDE catch sendEmail:", exception);
            throw new Meteor.Error(403, exception);
          }
        })
        .catch((error) => { throw new Meteor.Error(403, error); });
    }
  },
});
