var mongoose = require('mongoose');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,
    operation   : String
});

function allPhone(callback) {
  // body...
  Phone.find(function(error, phones) {
    // body...
    if (error) {
      return callback(error)
    }else {
      callback(null, phones)
    }
  })

}


module.exports = {

  allPhone     :allPhone

}
