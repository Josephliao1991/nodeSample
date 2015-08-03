var mongoose = require('mongoose');

//Create iNeDot Mongodb Module
var iNeDot = mongoose.model('inedot', {
    familyKey     : String,
    macAddr       : String,

    name          : String,
    situation     : String,

    owner         : String,
    connectState  : Boolean,

    battery       : Number,

    preset        : Array
});

function alliNeDot(callback) {
  // body...
  iNeDot.find(function (error, inedots) {
    // body...
    if (error) {
      return callback(error)
    }else {
      callback(null, inedots)
    }
  })
};

function familyiNeDot(request, callback) {
  // body...

  if (macAddr_find) {

    iNeDot.find({familyKey : familyKey_find,
                 macAddr   : macAddr_find},

      function(error, inedots) {
        // body...
        if (error) {
          return callback(error)
        }else {
          callback(null, inedots)
        }
      })
  }else {
    iNeDot.find({familyKey : familyKey_find},
      function(error, inedots) {
        // body...
        if (error) {
          return callback(error)
        }else {
          callback(null, inedots)
        }
      })
    }
};

module.exports = {

  alliNeDot     : alliNeDot,
  familyiNeDot  : familyiNeDot
}
