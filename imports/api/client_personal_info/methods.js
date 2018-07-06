import { Meteor } from 'meteor/meteor';
import ClientPersonalInfo from './collection';
import './hooks';

Meteor.methods({
  'client_personal_info.fetch': (clientID) => {
    console.log('client_personal_info.fetch clientID:', clientID)
    check(clientID, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Personal Info not fetched. User not logged in.");
    } else {
      const clientPersonalInfo = ClientPersonalInfo.findOne({ _id: clientID });
      console.log('clientPersonalInfo:', clientPersonalInfo)
      return clientPersonalInfo;
    }
  },
  'client_personal_info.create': (clientPersonalInfo) => {
    console.log('clientPersonalInfo:', clientPersonalInfo);
    check(clientPersonalInfo, {
      name: String,
      surname: String,
      cellNo: String,
      workNo: String,
      email: String,
      married: String,
      children: String,
      hobbies: String,
      occupation: String,
      otherInfo: String,
    });
    if (clientPersonalInfo.name.length === 0) throw new Meteor.Error(403, 'Name is required');
    if (clientPersonalInfo.surname.length === 0) throw new Meteor.Error(403, 'Surname is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Personal Info entry not created. User not logged in.");
    } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(403, "Client's Personal Info entry not created. User is not authorized.");
    } else {
      clientPersonalInfo.createdAt = new Date();
      clientPersonalInfo.createdBy = Meteor.userId();
      const clientID = ClientPersonalInfo.insert(clientPersonalInfo);
      console.log('Inserted client_personal_info: ', ClientPersonalInfo.find(clientPersonalInfo).fetch()[0]);
      return clientID;
    }
  },
  'client_personal_info.update': (clientID, clientPersonalInfo) => {
    check(clientID, String);
    check(clientPersonalInfo, {
      name: String,
      surname: String,
      cellNo: String,
      workNo: String,
      email: String,
      married: String,
      children: String,
      hobbies: String,
      occupation: String,
      otherInfo: String,
    });
    if (clientPersonalInfo.name.length === 0) throw new Meteor.Error(403, 'Name is required');
    if (clientPersonalInfo.surname.length === 0) throw new Meteor.Error(403, 'Surname is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Personal Info entry not updated. User not logged in.");
    } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(403, "Client's Personal Info entry not updated. User is not authorized.");
    } else {
      clientPersonalInfo.updatedAt = new Date();
      clientPersonalInfo.updatedBy = Meteor.userId();
      ClientPersonalInfo.update({ _id: clientID }, { $set: clientPersonalInfo });
      console.log('Updated client_personal_info: ', ClientPersonalInfo.find(clientPersonalInfo).fetch()[0]);
    }
  },
});
