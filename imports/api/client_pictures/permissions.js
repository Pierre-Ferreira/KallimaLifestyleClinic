import ClientPictures from './collection';

ClientPictures.allow({
  'insert': function() {
    // add custom authentication code here
    return true;
  },
  'update': function() {
    // add custom authentication code here
    return true;
  },
  'remove': function() {
    // add custom authentication code here
    return true;
  },
  // download: function(userId, fileObj) {
  //     return true
  // }
});
