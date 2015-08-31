var push = require('./push.js');
var inedot = require('./inedot.js');
var phone = require('./phone.js');
var mongoose = require('mongoose');
var cpush = require('./c-push.js');

function getDeviceOwner(familyKey, macAddr, callback) {
  // body...
  inedot.iNeDot.findOne({familyKey  : familyKey,
                         macAddr    : macAddr},
   function (error, inedot) {
     // body...
     if (error) {
        callback(error)
     }
     if (inedot) {
       var deviceToken = inedot.owner
      //  console.log("inedot : -- "+deviceToken);
       phone.Phone.findOne({familyKey  : familyKey,
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
  var macAddr    = request.body.macAddr
  var condition  = request.body.condition
  var identifier = request.body.identifier
  var req   = request
  var res   = response

  if (familyKey && macAddr && condition && identifier) {
    getDeviceOwner(familyKey, macAddr, function (error, phone) {
      // body...

      console.log("familyKey : "+familyKey);
      console.log("macAddr: "+macAddr);
      // if (phone) {
      //     console.log("phone : "+phone.deviceToken);
      // }else {
      //   console.log("null");
      // }
      if (phone) {
      //   var deviceToken;
      //   if (phone.operation == "ios") {
      //     deviceToken = phone.deviceToken
      //   }else {
      //     deviceToken = phone.token
      //   }
        /*
        Success  ==> 0
        failure  ==> 1
        Can Not Find ==> 2
        */
        console.log(phone);

        var message = {"messageFrom": "iNedotServer",
                       "report"     : "connectStateRsepons",
                       "inedot"     : macAddr,
                       "result"     : condition}
        //send push for phone to handle problem
        push.sendPushTrouble(phone, message, req, res);
        //auto delete c_push table data
        cpush.autoUpdateCPush(identifier);
      }

    })
  }else {
    response.json({"result":"lost some params..."})
  }



}

function deviceConnectStateChange(request, response) {
  // body...
  var familyKey  = request.body.familyKey
  var macAddr    = request.body.macAddr
  var condition  = request.body.condition
  var req   = request
  var res   = response

  /*
  disconnect ==> 0
  reconnect  ==> 1
  */

  var message = {"messageFrom": "iNedotServer",
                 "report"     : "deviceConnectStateChange",
                 "inedot"     : macAddr,
                 "result"     : condition}

  push.sendPushConnectStateChange(familyKey, message, req, res)

}

function deviceLowPowerAlert(request, response) {
  // body...
  var familyKey  = request.body.familyKey
  var macAddr    = request.body.macAddr
  var powerValue = request.body.powerValue
  var req   = request
  var res   = response

  var message = {"messageFrom": "iNedotServer",
                 "report"     : "deviceLowPowerAlert",
                 "inedot"     : macAddr,
                 "result"     : powerValue}

  push.sendPushLowPowerAlert(familyKey, message, req, res)

}

function troubleHandler(request, response) {
  // body...
  var req  = request
  var res  = response
  var trouble     = request.body.trouble
  console.log("trouble report (trouble): "+trouble);


  if (trouble == 0) {
    connectStateResponse(req, res)
  }else if (trouble == 1) {
    deviceConnectStateChange(req, res)
  }else if (trouble == 2) {
    deviceLowPowerAlert(req, res)
  }

}



module.exports = {

troubleHandler  : troubleHandler

}
