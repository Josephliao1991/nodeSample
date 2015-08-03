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

function familyiNeDot(request, resopnse, callback) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('iNeDots Query With familyKey: '+ familyKey_find);
  console.log('iNeDots Query With macAddr: '+ macAddr_find);

  var res = resopnse

  if (macAddr_find) {

     iNeDot.find({familyKey : familyKey_find,
                 macAddr   : macAddr_find},

      function(error, inedots) {
        // body...
        if (error) {
         callback(error)
        }else {
          // callback(null, inedots)
          res.send(inedots)
        }
      })
  }else {
     iNeDot.find({familyKey : familyKey_find},
      function(error, inedots) {
        // body...
        if (error) {
          callback(error)
        }else {
          // callback(null, inedots)
          res.send(inedots)
        }
      })
    }
};

module.exports = {

  alliNeDot     : alliNeDot,
  familyiNeDot  : familyiNeDot
}
