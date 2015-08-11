var push = require('push');
var inedot = require('inedot');
var phone = require('phone');

function getDeviceOwner(familiyKey, macAddr, callback) {
  // body...
  inedot.findOne({familiyKey  : familiyKey,
                  macAddr     : macAddr},
   function (error, inedot) {
     // body...
     if (error) {
        callback(error)
     }
     if (inedot) {

       phone.findOne({familiyKey  : familiyKey,
                      macAddr     : macAddr},
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
  var familiyKey  = request.body.familiyKey
  var macAddr     = request.body.macAddr
  var req   = request
  var res   = response

  getDeviceOwner(familiyKey, macAddr, function (error, phone) {
    // body...
    var deviceToken;
    if (phone.operation == "ios") {
      deviceToken = phone.deviceToken
    }else {
      deviceToken = phone.token
    }

    push.sendPushTrouble(deviceToken, req, res);


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
