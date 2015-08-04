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

function createiNeDot(request, response) {
  // body...
  var presetValue;
  if (request.body.situation == "temp" && request.body.temp) {
      presetValue = [{temp : request.body.temp}]
  }else if (request.body.situation == "alert" && request.body.alert) {
      presetValue = [{alert : request.body.alert}]
  }else if (request.body.situation == "message" && request.body.message) {
      presetValue = [{message : request.body.message}]
  }

  iNeDot.create({

      familyKey     : request.body.familyKey,
      macAddr       : request.body.macAddr,

      owner         : request.body.owner,
      connectState  : request.body.connectState,

      name          : request.body.name,
      situation     : request.body.situation,

      battery       : request.body.battery,

      preset        : presetValue
  },function(error, inedot){
    // body...
    if (error) {
        response.send(error)
    }else {
        // response.json(phone)
        response.send("success")
    }
  })

}

module.exports = {

  alliNeDot     : alliNeDot,
  familyiNeDot  : familyiNeDot,
  createiNeDot  : createiNeDot
}
