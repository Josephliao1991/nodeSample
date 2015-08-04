var mongoose = require('mongoose');

//Create Center Mongodb Module
var Center = mongoose.model('center', {
    familyKey     : String,
    macAddr       : String,

    connectState  : Boolean,
});

function allCenter(request, response) {
  // body...
  Center.find(function(error, centers) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(centers)
    }
  })
}

function familyCenter(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('Center Query With familyKey: '+ familyKey_find);
  console.log('Center Query With macAddr: '+ macAddr_find);

  if (macAddr_find) {

    Center.find({familyKey : familyKey_find,
                macAddr   : macAddr_find},

      function(error, center) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(center)
        }
      })
  }else {

    Center.find({familyKey : familyKey_find},
      function(error, centers) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(centers)
        }
      })
    }
}






module.exports = {
  allCenter     : allCenter,
  familyCenter  : familyCenter

}
