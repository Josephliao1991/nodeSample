var mongoose = require('mongoose');
var inedot = require('./inedot.js');
var phone = require('./phone.js');
var nodeiOSPush = require('./nodejs-apn.js');

function sendPush(request, response) {
  // body...
  var familyKey_alert = request.body.familyKey
  var macAddr_alert   = request.body.macAddr

  inedot.iNeDot.find({familyKey  : familyKey_alert,
                      macAddr    : macAddr_alert},
   function(error, inedot) {
      // body...
      var situation = inedot[0].situation
      var name      = inedot[0].name
      var macAddr   = inedot[0].macAddr
      console.log("Now iNeDot("+name+") Situation Is : " + situation);

      phone.Phone.find({familyKey  : familyKey_alert},
        function(error, phones) {
        // body...
        // console.log("Family Member Is : " + phones);

        for (var i = 0; i < phones.length; i++) {
          var deviceToken = phones[i].deviceToken
          console.log(deviceToken);
          nodeiOSPush.sendiOSPush(deviceToken, situation, name, macAddr)
        }

        response.end("success")
      })
   })

}




module.exports = {

  sendPush  : sendPush

}
