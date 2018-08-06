import { Meteor } from 'meteor/meteor';
import ClientBefAftPictures from './s3_picture_storage';
// import './hooks';
//
Meteor.methods({
  'client_bef_aft_pictures_picture.fetch': (clientID, picType) => {
    check(clientID, String)
    check(picType, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (picType.length === 0) throw new Meteor.Error(403, 'Picture Type is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Picture not fetched. User not logged in.");
    } else {
      console.log('clientID:', clientID);
      console.log('picType:', picType);
      const clientPicturesFile = ClientBefAftPictures.findOne({ $and: [{ 'meta.clientID': clientID }, { 'meta.weightPicType': picType }] });
      console.log('client_picture.fetch:', clientPicturesFile);
      return clientPicturesFile;
    }
  },
  'client_bef_aft_pictures_picture.remove': (clientID, picType) => {
    check(clientID, String)
    check(picType, String)
    if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
    if (picType.length === 0) throw new Meteor.Error(403, 'Picture Type is required');
    if (!Meteor.userId()) {
      throw new Meteor.Error(403, "Client's Picture not fetched. User not logged in.");
    } else {
      console.log('clientID:', clientID);
      console.log('picType:', picType);
      const clientPicturesFile = ClientBefAftPictures.findOne({ $and: [{ 'meta.clientID': clientID }, { 'meta.weightPicType': picType }] });
      if (clientPicturesFile) {
        ClientBefAftPictures.remove({_id: clientPicturesFile._id}, (error) => {
          if (error) {
            console.error(`File wasn't removed, error:  ${error.reason}`);
            throw new Meteor.Error(403, `Picture remove Error: ${error.reason}`)
          } else {
            console.info('File successfully removed');
            return `Removed: ${clientPicturesFile._id}`;
          }
        });
      } else {
        throw new Meteor.Error(403, `No '${picType}' picture found to remove for clientID: ${clientID}`);
      }
    }
  },
});
//   'client_consent.fetch': (clientID) => {
//     check(clientID, String)
//     if (clientID.length === 0) throw new Meteor.Error(403, 'client ID is required');
//     if (!Meteor.userId()) {
//       throw new Meteor.Error(403, "Client's Health Info not fetched. User not logged in.");
//     } else {
//       const clientHealthInfo = ClientConsent.findOne({ clientID });
//       console.log('clientID:', clientID);
//       console.log('client_consent.fetch:', clientHealthInfo);
//       return clientHealthInfo;
//     }
//   },
//   'client_consent.insert': (clientID, trimmedDataURL) => {
//     check(clientID, String);
//     check(trimmedDataURL, String);
//     if (clientID.length === 0) throw new Meteor.Error(403, 'clientID is required');
//     if (trimmedDataURL.length === 0) throw new Meteor.Error(403, 'trimmedDataURL is required');
//     if (!Meteor.userId()) {
//       throw new Meteor.Error(403, "Client's consent not inserted. User not logged in.");
//     } else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
//       throw new Meteor.Error(403, "Client's consent not inserted. User is not authorized.");
//     } else if (ClientConsent.findOne({ clientID })) {
//       throw new Meteor.Error(403, "Client's consent already exists!");
//     } else {
//       ClientConsent.insert({
//         clientID,
//         trimmedDataURL,
//         createdAt: new Date(),
//         createdBy: Meteor.userId(),
//         createdByUsername: Meteor.user().username,
//       });
//       console.log('Inserted client_consent: ', ClientConsent.findOne({ clientID }));
//       return ClientConsent.findOne({ clientID });
//     }
//   },
// });
