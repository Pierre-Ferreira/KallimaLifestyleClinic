// import { Meteor } from 'meteor/meteor';
// // import Images from './collection';
//
// /* Set deny/allow rules:
//  * Deny all
//  * @see http://docs.meteor.com/#/full/deny
//  */
// if (Meteor.isServer) {
//   Images.denyClient();
//
//   /* Allow all
//    * @see http://docs.meteor.com/#/full/allow
//    */
//   Images.allowClient();
//
//   /* Deny per action
//    * @see http://docs.meteor.com/#/full/deny
//    */
//   Images.deny({
//     insert: function() {
//       return false;
//     },
//     update: function() {
//       return true;
//     },
//     remove: function() {
//       return false;
//     },
//   });
//
//   /* Allow per action
//    * @see http://docs.meteor.com/#/full/allow
//    */
//   Images.allow({
//     insert: function() {
//       return true;
//     },
//     update: function() {
//       return false;
//     },
//     remove: function() {
//       return true;
//     },
//   });
// }
