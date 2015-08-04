var mongoose = require('mongoose');
var inedot = require('./inedot.js');
var phone = require('./phone.js');

function sendPush(request, response) {
  // body...
  var familyKey_alert = request.body.familyKey
  var macAddr_alert   = request.body.macAddr

  inedot.iNeDot.findOne({familyKey : familyKey_alert,
                         macAddr   : macAddr_alert},
    function(error,inedot) {
      // body...
      if (error) {
        response.send(error)
      }
      if (inedot) {
        var situation = inedot.situation
        response.send(situation)
      }else {
        response.send("fail")
      }

    })

    phone.Phone.findOne({familyKey  : familyKey_alert},
      function(error, phones) {
      // body...
      console.log(phones);

    })

}




module.exports = {

  sendPush  : sendPush

}
