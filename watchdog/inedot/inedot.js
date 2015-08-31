var mongoose = require('mongoose');
var center = require('./center.js');
var cpush = require('./c-push.js');

//Create iNeDot Mongodb Module
var iNeDot = mongoose.model('inedot', {
    familyKey     : String,
    macAddr       : String,

    name          : String,
    situation     : Array,

    owner         : String,
    connectState  : Boolean,

    battery       : Number,

    preset        : Array
});
function checkiNeDotExist(macAddr,callback) {
  // body...
  iNeDot.findOne({macAddr : macAddr}, function (error, inedot) {
    // body...
    if (error) {
      return error
    }
    if (inedot) {
      console.log("checkiNeDotExist : "+inedot.familyKey);
      return callback(null, inedot)
    }else {
      return callback(null, null)
    }
  })
}

function checkiNeDotInFamily(familyKey, macAddr, callback) {
  // body...
  iNeDot.findOne({familyKey : familyKey,
                  macAddr   : macAddr},
  function (error, inedot) {
    // body...
    if (error) {
      return error
    }
    if (inedot) {
      console.log("checkiNeDotInFamily: "+inedot.familyKey);
      return callback(null, "true")
    }else {
      return callback(null, "false")
    }
  })
}

/*================================================*/

function alliNeDot(request, response) {
  // body...
  iNeDot.find(function (error, inedots) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(inedots)
    }
  })
};

function familyOwneriNeDot(request, response) {
  // body...
  var familyKey_find  = request.query.familyKey
  var owner_find      = request.query.owner

  console.log("iNeDot Owner By FamilyKey : "+familyKey_find);
  console.log("iNeDot Qwner By OwnerID   : "+owner_find);

  if (familyKey_find && owner_find) {

    iNeDot.find({familyKey : familyKey_find,
                owner      : owner_find},function (error, inedots) {
                  // body...

                  if (error) {
                    response.send(error)
                  }

                  if (inedots) {
                    response.json(inedots)
                  }else {
                    response.json({"result" : "none"})
                  }

                })

  }else {

    response.json({"result" : "lost some params..."})
  }

}

function familyiNeDot(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('iNeDots Query With familyKey: '+ familyKey_find);
  console.log('iNeDots Query With macAddr: '+ macAddr_find);

  if (macAddr_find) {
     iNeDot.find({familyKey : familyKey_find,
                  macAddr   : macAddr_find},
      function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          // console.log("iNeDots Query success");
          response.json(inedots)
        }
      })
  }else {
     iNeDot.find({familyKey : familyKey_find},
      function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(inedots)
        }
      })
    }
};

function inedotExist(request, response) {
  // body...
  var macAddr_find = request.query.macAddr

  if (macAddr_find) {
    checkiNeDotExist(macAddr_find, function (error, indeot) {
      // body...
      if (indeot) {

        var data = {"familyKey"     : indeot.familyKey,
                    "macAddr"       : indeot.macAddr,
                    "owner"         : indeot.owner,
                    "connectState"  : indeot.connectState,
                    "name"          : indeot.name,
                    "situation"     : indeot.situation,
                    "battery"       : indeot.battery,
                    "preset"        : indeot.preset}

        response.json({"result" : true,
                       "data" : data})
      }else {
        response.json({"result" : false})
      }
    })
  }else {
    response.json({"result" : false})
  }
}


function createiNeDot(request, response) {
  // body...
  var familyKey_create = request.body.familyKey
  var macAddr_create = request.body.macAddr
  var owner_create = request.body.owner
  var connectState_create = request.body.connectState
  var name_create = request.body.name
  var situation_create = request.body.situation //json
  var battery_create = request.body.battery
  var preset_create   = request.body.preset //json
  // var presetValue;
  // if (request.body.situation == "temp" && request.body.preset) {
  //     presetValue = [{temp : request.body.preset}]
  // }else if (request.body.situation == "alert" && request.body.preset) {
  //     presetValue = [{alert : request.body.preset}]
  // }else if (request.body.situation == "message" && request.body.preset) {
  //     presetValue = [{message : request.body.preset}]
  // }
  console.log(familyKey_create);
  console.log(macAddr_create);
  console.log(owner_create);
  console.log(connectState_create);
  console.log(name_create);
  console.log(situation_create);
  console.log(battery_create);
  console.log(preset_create);

  // console.log("createiNeDot request By deviceToken : " +owner_create +"in family : "+familyKey_create);
  //checkiNeDotExist
  checkiNeDotExist(macAddr_create,function (error, inedot) {
    // body...
    if (error) {
      response.json({result : "fail"})
    }

    if (inedot) {
      response.json({result : "fail,inedot is exist"})
    }else {
      if (familyKey_create && macAddr_create && owner_create && connectState_create &&
        name_create && situation_create && battery_create && preset_create) {

          //save to iNedot
          var situation_array = [];
          situation_array.push(situation_create)
          var preset_array = [];
          preset_array.push(preset_create)
        iNeDot.create({

            familyKey     : familyKey_create,
            macAddr       : macAddr_create,

            owner         : owner_create,
            connectState  : connectState_create,

            name          : name_create,
            situation     : situation_array,

            battery       : battery_create,

            preset        : preset_array
        },function(error, inedot){
          // body...
          if (error) {
              response.send(error)
          }else {
              // response.json(phone)
              response.json({result : "success"})
          }
        })

        //if iNedot's owner is center,auto create c_push table for it!
        center.checkCenterInFamily(familyKey_create,owner_create,function (error,exist) {
          // body...
          if (error) {
            console.log(error);
          }

          if (exit) {
            //autocreate c-push table
            cpush.autoCreateCPush(request, response)


          }

        })

      }else {
        response.json({result : "fail"})
      }
    }

  })




}

function updateiNeDot(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr
  var owner_find     = request.body.owner

  console.log("updateiNeDot : "+familyKey_find);
  console.log("updateiNeDot : "+macAddr_find);

  if (familyKey_find && macAddr_find) {
    iNeDot.findOne({familyKey : familyKey_find,
                  macAddr  : macAddr_find },function(error, inedot) {
    // return iNeDot.findById(identifier,function(error, inedot) {
        // body...
        console.log("Show inedot : "+inedot);
        if (error) {
          response.end(error)
        }

        //change iNedot data
        if (inedot) {
          // if (request.body.familyKey) {
          //     inedot.familyKey       = request.body.familyKey;
          //   }
          // if (request.body.macAddr) {
          //     inedot.macAddr         = request.body.macAddr;
          //   }
          if (request.body.situation) {
              inedot.situation       = request.body.situation;
            }
          if (request.body.connectState) {
              inedot.connectState    = request.body.connectState;
            }
          if (request.body.name) {
              inedot.name            = request.body.name;
            }
          if (request.body.battery) {
              inedot.battery         = request.body.battery;
            }
          if (request.body.owner) {
              inedot.owner           = request.body.owner;

              center.checkCenterInFamily(familyKey_find,owner_create,function (error,exist) {
                // body...
                if (error) {
                  console.log(error);
                }
                console.log("isCenter");
                if (exit) {
                  //autocreate c-push table
                  cpush.autoCreateCPush(request, response)
                }

              });

            }
          if (request.body.sisuition) {
              inedot.situation       =  request.body.situation
          }

          if (request.body.preset) {
              inedot.preset          =  request.body.preset
          }


          // response.send(inedot)
          return inedot.save(function(error) {
            if (error) {
              response.send(error);
            }else {
              response.json({result : "success"})              // return response.send(phone);
            }
          });

          //auto create c-push table for center if inedot's owner is center
          //if iNedot's owner is center,auto create c_push table for it!


        }else {
          response.json({result : "no such device"})
        }
      })
  }else {
    response.json({result : "fail,lost some params"})
  }


}

function deleteiNeDot(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log("deleteiNeDot : "+familyKey_find);
  console.log("deleteiNeDot : "+macAddr_find);

  iNeDot.findOne({familyKey : familyKey_find,
                  macAddr   : macAddr_find },

  function(error, inedot) {

      // body...
      if (error) {
        response.end(error)
      }
      if (inedot) {
          // response.send(center)
          inedot.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.json({result : "success"})
            }
          })
      }else {
        response.json({result : "no such device"})
      }
    })
}

function deleteiNeDotById(request, response) {
  // body...
  var id_find  = request.body.identifier
  console.log("deleteiNeDotById: "+id_find);

  iNeDot.findOne({_id   : id_find},
    function(error, inedot) {
      // body...
      if (error) {
        response.end(error)
      }
      if (inedot) {
          // response.send(center)
          inedot.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.json({result : "success"})
            }
          })
      }else {
        response.json({result : "no such device"})
      }
    })
}

module.exports = {

  alliNeDot     : alliNeDot,
  familyiNeDot  : familyiNeDot,
  familyOwneriNeDot : familyOwneriNeDot,
  createiNeDot  : createiNeDot,
  updateiNeDot  : updateiNeDot,
  deleteiNeDot  : deleteiNeDot,
  deleteiNeDotById   : deleteiNeDotById,
  inedotExist  : inedotExist,
  iNeDot        : iNeDot
}
