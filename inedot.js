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

function alliNeDot(request, response) {
  // body...
  iNeDot.find(function (error, inedots) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(inedots)
    }
  })
};

function familyiNeDot(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('iNeDots Query With familyKey: '+ familyKey_find);
  console.log('iNeDots Query With macAddr: '+ macAddr_find);

  if (macAddr_find) {
     iNeDot.find({familyKey : familyKey_find,
                  macAddr   : macAddr_find},
      function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(inedots)
        }
      })
  }else {
     iNeDot.find({familyKey : familyKey_find},
      function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(inedots)
        }
      })
    }
};

module.exports = {

  alliNeDot     : alliNeDot,
  familyiNeDot  : familyiNeDot
}
