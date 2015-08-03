var mongoose = require('mongoose');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,
    operation   : String
});
console.log("module phone");
module.exports = function phone(callback) {
  // body...
  console.log("start");
  Phone.find(function(error, phones) {
    // body...
    if (error) {
      return callback(error)
    }else {
      callback(null, phones)
    }
  })

}
