import { Meteor } from 'meteor/meteor';
import ClientHealthInfo from '../client_health_info/collection';
import ClientPersonalInfo from '../client_personal_info/collection';
import ClientWeightInfo from '../client_weight_info/collection';


Meteor.methods({
  'client_all_info.fetch': (clientID) => {
    check(clientID, String)
    if (clientID.length === 0) throw new Meteor.Error(403, "Client's Info not fetched.Client ID is required");
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Info not fetched. User not logged in.");
    } else {
      const clientPersonalInfo = ClientPersonalInfo.findOne({ _id: clientID });
      const clientHealthInfo = ClientHealthInfo.findOne({ clientID });
      const clientWeightInfo = ClientWeightInfo.findOne({ clientID });
      const clientAllInfo = {
        clientPersonalInfo,
        clientHealthInfo,
        clientWeightInfo,
      };
      console.log('clientID:', clientID);
      console.log('client_all_info.fetch:', clientAllInfo);
      return clientAllInfo;
    }
  },
});
