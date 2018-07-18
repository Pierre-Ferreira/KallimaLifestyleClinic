// import { Meteor } from 'meteor/meteor';
// // import GameRunningStatistics from './collection';
//
// Meteor.publish('createdby_username', (userID) => {
//   check(userID, String);
//   return Meteor.users.find({ _id: userID }, { fields: { username: 1 } });
//   // const createdByUsername = (createdByUser) ? createdByUser.username : 'N/a'
//   // return createdByUsername;
// });
//
// Meteor.publish('updatedby_username', (userID) => {
//   check(userID, String);
//   console.log("HELLO:", userID)
//   const returnVal =  Meteor.users.find({ _id: userID }, { fields: { username: 1 } });
//   console.log('returnVal:', returnVal)
//   return returnVal
//   // const updatedByUser = Meteor.users.findOne({ _id: userID });
//   // const updatedByUsername = (updatedByUser) ? updatedByUser.username : 'N/a'
//   // return updatedByUsername;
// });
