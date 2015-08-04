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

function familyCPush(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var c_macAddr_find = request.query.c_macAddr
  console.log('c_push Query With familyKey: '+ familyKey_find);
  console.log('c_push Query With c_macAddr: '+ c_macAddr_find);

  if (c_macAddr_find) {

    CPush.find({familyKey : familyKey_find,
                c_macAddr : c_macAddr_find,
                checkMark : false},

      function(error, c_push) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(c_push)
        }
      })
  }else {
    CPush.find({familyKey : familyKey_find,
                checkMark : false},

      function(error, c_push) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(c_push)
        }
      })
  }
}

function updateCPush(request, response) {
  // body...
  CPush.create({

      familyKey     : request.body.familyKey,
      c_macAddr     : request.body.c_macAddr,
      i_macAddr     : request.body.i_macAddr,
      command       : request.body.command,
      checkMark     : false

  },function(error, c_push){
    // body...
    if (error) {
        response.send(error)
    }else {
        // response.json(phone)
        response.send("success")
    }
  })
}

module.exports = {
  allCPush    : allCPush,
  familyCPush : familyCPush,
  updateCPush : updateCPush

}
