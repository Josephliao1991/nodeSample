var mongoose = require('mongoose');
var inedot = require('./inedot.js');
var phone = require('./phone.js');

function sendPush(request, response) {
  // body...
  var familyKey_alert = request.body.familyKey
  var macAddr_alert   = request.body.macAddr
  var xx;
  xx = inedot.iNeDot.findOne({familyKey : familyKey_alert,
                         macAddr   : macAddr_alert}).exec()

  console.log(xx); 

    phone.Phone.findOne({familyKey  : familyKey_alert},
      function(error, phones) {
      // body...
      console.log(phones);

    })

}




module.exports = {

  sendPush  : sendPush

}
