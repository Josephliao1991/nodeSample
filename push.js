var mongoose = require('mongoose');
var inedot = require('./inedot.js');
var phone = require('./phone.js');
var nodeiOSPush = require('./nodejs-apn.js');
var nodeAndroidPush = require('./nodejs-gcm.js');

function sendPush(request, response) {
  // body...
  var familyKey_alert = request.body.familyKey
  var macAddr_alert   = request.body.macAddr

  inedot.iNeDot.find({familyKey  : familyKey_alert,
                      macAddr    : macAddr_alert},
   function(error, inedot) {
      // body...
      if (inedot.length>0) {
        var situation = inedot[0].situation
        var name      = inedot[0].name
        var macAddr   = inedot[0].macAddr
        console.log("Now iNeDot("+name+") Situation Is : " + situation);

        phone.Phone.find({familyKey  : familyKey_alert},
          function(error, phones) {
          // body...
          console.log("Family Member Is : " + phones);
          console.log("phones length : "+phones.length);

          for (var i = 0; i < phones.length; i++) {
            var familyKey   = phones[i].familyKey
            var deviceToken = phones[i].deviceToken
            var token       = phones[i].token
            var operation   = phones[i].operation
            var badgeNumber = (phones[i].badgeNumber)+1
            // badgeNumber++
            console.log("familyKey: "+familyKey);
            console.log("deviceToken: "+deviceToken);
            console.log("token: "+token);
            console.log("operation: "+operation);
            console.log("badgeNumber: "+badgeNumber);

            if (operation == "ios") {
              //iOS
              console.log("iOSPush with token : "+deviceToken);
              nodeiOSPush.sendiOSPush(deviceToken,badgeNumber, situation, name, macAddr)
            }else if(operation == "android"){
              //Android
              console.log("androidPush with token : "+token);
              nodeAndroidPush.sendAndroidPush(token,badgeNumber, situation, name, macAddr)
            }
            phone.plusBadgeNumber(familyKey, deviceToken);
          }
          response.end("success")
        })
      }else {
        response.end("fail")
      }
   })
}


function sendPushTrouble(phone, message, request, response) {
  // body...
  var operation = phone.operation
  var deviceToken;
  if (phone.operation == "ios") {
    deviceToken = phone.deviceToken
    console.log("iOSPush with token : "+deviceToken);
    nodeiOSPush.sendiOSTroublePush(deviceToken, message)
  }else {
    deviceToken = phone.token
    console.log("androidPush with token : "+deviceToken);
    nodeAndroidPush.sendAndroidTroublePush(deviceToken, message)
  }

  response.send("SendPushTrouble Success")
  console.log("SendPushTrouble Success")
}

function sendPushConnectStateChange(familyKey,message, request, response) {
  // body...

    phone.Phone.find({familyKey  : familyKey},
      function(error, phones) {
      // body...
      console.log("Family Member Is : " + phones);
      console.log("phones length : "+phones.length);

      for (var i = 0; i < phones.length; i++) {
        var familyKey   = phones[i].familyKey
        var deviceToken = phones[i].deviceToken
        var token       = phones[i].token
        var operation   = phones[i].operation
        // badgeNumber++
        console.log("familyKey: "+familyKey);
        console.log("deviceToken: "+deviceToken);
        console.log("token: "+token);
        console.log("operation: "+operation);

        if (operation == "ios") {
          //iOS
          console.log("iOSPush with token : "+deviceToken);
          nodeiOSPush.sendiOSTroublePush(deviceToken, message)
        }else if(operation == "android"){
          //Android
          console.log("androidPush with token : "+token);
          nodeAndroidPush.sendAndroidTroublePush(token, message)
        }
        // phone.plusBadgeNumber(familyKey, deviceToken);
      }
      response.send("sendPushConnectStateChange Success")
      console.log("sendPushConnectStateChange Success")
    })

}

function sendPushLowPowerAlert(familyKey, message, request, response) {
  // body...
  phone.Phone.find({familyKey  : familyKey},
    function(error, phones) {
    // body...
    console.log("Family Member Is : " + phones);
    console.log("phones length : "+phones.length);

    for (var i = 0; i < phones.length; i++) {
      var familyKey   = phones[i].familyKey
      var deviceToken = phones[i].deviceToken
      var token       = phones[i].token
      var operation   = phones[i].operation
      // badgeNumber++
      console.log("familyKey: "+familyKey);
      console.log("deviceToken: "+deviceToken);
      console.log("token: "+token);
      console.log("operation: "+operation);

      if (operation == "ios") {
        //iOS
        console.log("iOSPush with token : "+deviceToken);
        nodeiOSPush.sendiOSTroublePush(deviceToken, message)
      }else if(operation == "android"){
        //Android
        console.log("androidPush with token : "+token);
        nodeAndroidPush.sendAndroidTroublePush(token, message)
      }
      // phone.plusBadgeNumber(familyKey, deviceToken);
    }
    response.send("sendPushLowPowerAlert Success")
    console.log("sendPushLowPowerAlert Success")
  })
}

/*===========================Push TestinG API==================================*/
function pushTest(request, response) {
  // body...
  var familyKey   = request.query.familyKey
  var deviceToken = request.query.deviceToken
  var operation = request.query.operation
  if (operation == "ios") {
    //iOS
    console.log("TestinG => iOSPush with token : "+deviceToken);
    nodeiOSPush.sendiOSPush(deviceToken,99999, "alert", "PushTest", "JosephSend")
  }else if(operation == "android"){
    //Android
    console.log("TestinG => androidPush with token : "+deviceToken);
    nodeAndroidPush.sendAndroidPush(deviceToken,99999, "alert", "PushTest", "JosephSend")
  }
  phone.plusBadgeNumber(familyKey, deviceToken);
  response.json({"result" : "success"})

}

module.exports = {

  sendPush  : sendPush,
  sendPushTrouble   : sendPushTrouble,
  sendPushConnectStateChange    : sendPushConnectStateChange,
  sendPushLowPowerAlert   : sendPushLowPowerAlert,
  pushTest  : pushTest
}
