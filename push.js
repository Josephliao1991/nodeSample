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
              // console.log("iOSPush");
              nodeiOSPush.sendiOSPush(deviceToken,badgeNumber, situation, name, macAddr)
            }else {
              //Android
              // console.log("androidPush");
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




module.exports = {

  sendPush  : sendPush

}
