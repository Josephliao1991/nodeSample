var mongoose = require('mongoose');
var inedot = require('./inedot.js');
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
    preset        : String,
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

function familyCPush_JSON(request, response) {
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
        }

        if (c_push.length>0) {

          //Prepare data fot center
          var data = []

          for (var i = 0; i < c_push.length; i++) {
            console.log("C_Push Data Length : "+c_push.length);
            var _id       = c_push[i]._id
            var i_macAddr = c_push[i].i_macAddr
            var command   = ""+c_push[i].command
            var presetValue = ""+c_push[i].preset
            // var presetValue = "test preset"
            var item = {"_id"      : _id,
                        "i_macAddr": i_macAddr,
                        "command"  : command,
                        "preset"   : presetValue}
            data.push(item)
            console.log("C_Push Data["+i+"]: "+item);
          }

          console.log("c_push data :"+data);
          if (data.length>0) {
              response.json(data)
              // response.send(data)
          }else {
            response.send("Oh,shit,")
          }


        }else {
          response.json([{"result":"none"}])
        }
      })
  }else {
    // CPush.find({familyKey : familyKey_find,
    //             checkMark : false},
    //
    //   function(error, c_push) {
    //     // body...
    //     if (error) {
    //       response.send(error)
    //     }else {
    //       response.json(c_push)
    //     }
    //   })
    response.json([{"result":"lost some parmas"}])
  }
}

function createCPush(request, response) {
  // body...
  var familyKey_create  = request.body.familyKey
  var c_macAddr_create  = request.body.c_macAddr
  var i_macAddr_create  = request.body.i_macAddr
  var command_create    = request.body.command
  var preset_create
  if (request.body.preset) {
    preset_create = request.body.preset+""
  }else {
    preset_create = "none"
  }

  if (familyKey_create && c_macAddr_create && i_macAddr_create && command_create && preset_create ) {

    CPush.create({

        familyKey     : familyKey_create,
        c_macAddr     : c_macAddr_create,
        i_macAddr     : i_macAddr_create,
        command       : command_create,
        preset        : preset_create,
        checkMark     : false

    },function(error, c_push){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.json({"result" : "success"})
      }
    })

  }else {
    response.json({"result" : "lost some params"})
  }


}

function updateCPush(request, response) {
  // body...
  // var familyKey_find  = request.body.familyKey
  // var c_macAddr_find  = request.body.c_macAddr
  // var i_macAddr_find  = request.body.i_macAddr
  var identifier_find = request.body.identifier;

  // console.log(familyKey_find);
  // console.log(c_macAddr_find);
  // console.log(i_macAddr_find);
  console.log(identifier_find);

  CPush.findById({_id : identifier_find},

  function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }
      if (c_push) {
        // if (request.body.familyKey) {
        //     push.familyKey       = request.body.familyKey;
        //   }
        // if (request.body.c_macAddr) {
        //     push.c_macAddr       = request.body.c_macAddr;
        //   }

        c_push.checkMark = true

        // response.send(center)
        return c_push.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.json({"result" : "success"})              // return response.send(phone);
          }
        });
      }else {
        response.json({"result" : "no such CPush"})
      }
    })
}

function changeCPushCheckMark(request, response) {
  // body...
  var identifier_find = request.body.identifier;
  var checkMark       = request.body.checkMark;

  console.log("changeCPushCheckMark : "  +identifier_find);
  console.log("changeCPushCheckMark : "  +checkMark);

  CPush.findById({ _id : identifier_find},
    function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }
      if (c_push) {
        // if (request.body.familyKey) {
        //     push.familyKey       = request.body.familyKey;
        //   }
        // if (request.body.c_macAddr) {
        //     push.c_macAddr       = request.body.c_macAddr;
        //   }
        if (checkMark) {
          c_push.checkMark = checkMark
        }

        return c_push.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.json({"result" : "success"})              // return response.send(phone);
          }
        });
      }else {
        response.json({"result" : "no such CPush"})
      }
    })
}

function deleteCPush(request, response) {
  // body...
  // var familyKey_find  = request.body.familyKey
  // var c_macAddr_find  = request.body.c_macAddr
  // var i_macAddr_find  = request.body.i_macAddr
  var id_find  = request.body.identifier

  // console.log(familyKey_find);
  // console.log(c_macAddr_find);
  // console.log(i_macAddr_find);
  console.log("deleteCPush : "+id_find);

  CPush.findOne({_id  : id_find},
    function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }

      if (c_push) {
          // response.send(center)
          c_push.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.json({"result" : "success"})
            }
          })
      }else {
        // response.send("no such CPush")
        response.json({"result" : "fail"})
      }
    })
}

/*=====================CPush TestinG==========================*/

function changeCPushCheckMarkTest(request, response) {
  // body...
  var identifier_find = request.query.identifier;
  var checkMark       = request.query.checkMark;

  console.log("changeCPushCheckMarkTest: "+identifier_find);
  console.log("changeCPushCheckMarkTest: "+checkMark);

  if (identifier_find) {
    CPush.findById({ _id : identifier_find},
      function(error, c_push) {
        // body...
        if (error) {
          response.end(error)
        }
        if (c_push) {
          // if (request.body.familyKey) {
          //     push.familyKey       = request.body.familyKey;
          //   }
          // if (request.body.c_macAddr) {
          //     push.c_macAddr       = request.body.c_macAddr;
          //   }
          if (checkMark) {
            c_push.checkMark = checkMark
          }

          return c_push.save(function(error) {
            if (error) {
              response.send(error);
            }else {
              response.json({"result" : "success"})              // return response.send(phone);
            }
          });
        }else {
          response.json({"result" : "no such CPush"})
        }
      })
  }


}


function changeCPushDataTest(request, response) {
  // body...
  var identifier_find = request.body.identifier;
  var checkMark       = request.body.checkMark;

  console.log("changeCPushDataTest: "+identifier_find);
  console.log("changeCPushDataTest: "+checkMark);

  CPush.findById({ _id : identifier_find},
    function(error, c_push) {
      // body...
      if (error) {
        response.end(error)
      }
      if (c_push) {
        if (request.body.familyKey) {
            c_push.familyKey       = request.body.familyKey;
          }
        if (request.body.c_macAddr) {
            c_push.c_macAddr       = request.body.c_macAddr;
          }
        if (checkMark) {
          c_push.checkMark = checkMark
        }

        return c_push.save(function(error) {
          if (error) {
            response.send(error);
          }else {
            response.json({"result" : "success"})              // return response.send(phone);
          }
        });
      }else {
        response.json({"result" : "no such CPush"})
      }
    })
}

module.exports = {
  allCPush    : allCPush,
  familyCPush : familyCPush,
  familyCPush_JSON  : familyCPush_JSON,
  createCPush : createCPush,
  updateCPush : updateCPush,
  changeCPushCheckMark  : changeCPushCheckMark,
  deleteCPush : deleteCPush,

  CPush : CPush,

  changeCPushCheckMarkTest  : changeCPushCheckMarkTest,
  changeCPushDataTest   : changeCPushDataTest

}
