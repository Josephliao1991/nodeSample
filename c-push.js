var mongoose = require('mongoose');

//Create Push Mongodb Module
/* Command Rule
command : Number
Baby  = 0
Area  = 1
Alert = 2
Temp  = 3
Break Connection  = 4
*/
var CPush = mongoose.model('c_push', {
    familyKey     : String,
    c_macAddr     : String,
    i_macAddr     : String,
    command       : Number,
    checkMark     : Boolean
});

function allCPush(request, response) {
  // body...
  CPush.find(function(error, c_pushs) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(c_pushs)
    }
  })
}



module.exports = {
  allCPush    : allCPush

}
