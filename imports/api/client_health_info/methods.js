import { Meteor } from 'meteor/meteor';
import ClientHealthInfo from './collection';
import './hooks';

Meteor.methods({
  'client_health_info.fetch': (clientID) => {
    check(clientID, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Health Info not fetched. User not logged in.");
    } else {
      const clientHealthInfo = ClientHealthInfo.findOne({ clientID });
      console.log('clientID:', clientID);
      console.log('client_health_info.fetch:', clientHealthInfo);
      return clientHealthInfo;
    }
  },
  'client_health_info.upsert': (clientID, clientHealthInfo) => {
    check(clientID, String);
    check(clientHealthInfo, {
      clientID: String,
      height: String,
      currentWeight: String,
      goalWeight: String,
      allergies: String,
      operations: String,
      alcohol: String,
      favouriteFoods: String,
      health: String,
      otherInfo: String,
    });
    if (clientID.length === 0) throw new Meteor.Error(403, 'clientID is required');
    if (clientHealthInfo.height.length === 0) throw new Meteor.Error(403, 'Height is required');
    if (clientHealthInfo.currentWeight.length === 0) throw new Meteor.Error(403, 'Current Weight is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Health Info entry not updated. User not logged in.");
    } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
      throw new Meteor.Error(403, "Client's Health Info entry not updated. User is not authorized.");
    } else {
      clientHealthInfo.updatedAt = new Date();
      clientHealthInfo.updatedBy = Meteor.userId();
      clientHealthInfo.updatedByUsername = Meteor.user().username;
      ClientHealthInfo.update(
        { clientID },
        { $set: clientHealthInfo },
        { upsert: true }
      );
      console.log('Upserted client_health_info: ', ClientHealthInfo.find(clientHealthInfo).fetch()[0]);
      return ClientHealthInfo.findOne(clientHealthInfo);
    }
  },
});
