import { Meteor } from 'meteor/meteor';
import Fuse from 'fuse.js';
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
    if (clientID.length === 0) throw new Meteor.Error(403, 'clientID is required');
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
  'client_personal_info.search': (searchValue) => {
    check(searchValue, String);
    const allUsers = ClientPersonalInfo.find(
      {},
      { fields: { name: 1, surname: 1 } },
    ).fetch();
    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        'name',
        'surname',
      ],
    };
    const fuse = new Fuse(allUsers, options);
    const result = fuse.search(searchValue);
    return result;
  },
});
