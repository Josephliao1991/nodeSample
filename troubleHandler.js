var push = require('./push.js');
var inedot = require('./inedot.js');
var phone = require('./phone.js');
var mongoose = require('mongoose');

function getDeviceOwner(familiyKey, macAddr, callback) {
  // body...
  inedot.iNeDot.findOne({familiyKey  : familiyKey,
                  macAddr     : macAddr},
   function (error, inedot) {
     // body...
     if (error) {
        callback(error)
     }
     if (inedot) {
       var deviceToken = inedot.owner
       phone.Phone.findOne({familiyKey  : familiyKey,
                            deviceToken : deviceToken},
        function (error, phone) {
          // body...
          if (error) {
            callback(error)
          }
          if (phone) {
            callback(null, phone)
          }else {
             callback(null, null)
          }
        })

     }else {
        callback(null, null)
     }
   })
}


function connectStateResponse(request, response) {
  // body...
  var familyKey  = request.body.familyKey
  var macAddr     = request.body.macAddr
  var req   = request
  var res   = response

  getDeviceOwner(familyKey, macAddr, function (error, phone) {
    // body...

    console.log("familyKey : "+familyKey);
    console.log("macAddr: "+macAddr);
    if (phone) {
        console.log("phone : "+phone.deviceToken);
    }else {
      console.log("null");
    }


    // var deviceToken;
    // if (phone.operation == "ios") {
    //   deviceToken = phone.deviceToken
    // }else {
    //   deviceToken = phone.token
    // }
    //
    // push.sendPushTrouble(deviceToken, req, res);


  })

}

function troubleHandler(request, response) {
  // body...
  var req  = request
  var res  = response
  var trouble     = request.body.trouble

  connectStateResponse(req, res)


}


module.exports = {

troubleHandler  : troubleHandler

}
