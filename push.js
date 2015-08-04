var mongoose = require('mongoose');
var inedot = require('./inedot.js');

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

}




module.exports = {

  sendPush  : sendPush

}
