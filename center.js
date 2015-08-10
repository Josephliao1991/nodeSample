var mongoose = require('mongoose');

//Create Center Mongodb Module
var Center = mongoose.model('center', {
    familyKey     : String,
    macAddr       : String,

    connectState  : Boolean,
});


function checkCenterExist(macAddr,callback) {
  // body...
  Center.findOne({macAddr : macAddr}, function (error, center) {
    // body...
    if (error) {
      return error
    }
    if (center) {
      console.log(center);
      return callback(null, center)
    }else {
      return callback(null, null)
    }
  })
}

function checkCenterInFamily(familyKey, macAddr, callback) {
  // body...
  Center.findOne({familyKey : familyKey,
                  macAddr   : macAddr},
  function (error, center) {
    // body...
    if (error) {
      return error
    }
    if (center) {
      console.log(center.familyKey);
      return callback(null, "true")
    }else {
      return callback(null, "false")
    }
  })
}


/*==========================================================*/

function allCenter(request, response) {
  // body...
  Center.find(function(error, centers) {
    // body...
    if (error) {
      response.send(error)
    }else {
      response.json(centers)
    }
  })
}

function familyCenter(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  var macAddr_find   = request.query.macAddr
  console.log('Center Query With familyKey: '+ familyKey_find);
  console.log('Center Query With macAddr: '+ macAddr_find);

  if (macAddr_find) {

    Center.find({familyKey : familyKey_find,
                macAddr   : macAddr_find},

      function(error, center) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(center)
        }
      })
  }else {

    Center.find({familyKey : familyKey_find},
      function(error, centers) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(centers)
        }
      })
    }
}

function getCenterFamilyKey(request, response) {
  // body...
  var macAddr_find = request.query.macAddr
  console.log("getFamilyKey Query : " + macAddr_find);
  if (macAddr_find) {
      Center.findOne({macAddr : macAddr_find},
        function(error, center) {
          // body...
          if (error) {
            response.send(error)
          }
          // console.log(center);
          if (center) {
            var familyKey = center.familyKey
            console.log(center.familyKey);
            response.send('[{"' + familyKey + '"}]')
          }else {
            response.end("Belong with no family")
          }
        })
  }
}

function centerExist(request, response) {
  // body...
  var macAddr_find = request.query.macAddr

  if (macAddr_find) {
    checkCenterExist(macAddr_find, function (error, center) {
      // body...
      if (center) {

        var data = {"familyKey"     : center.familyKey,
                    "macAddr"       : center.macAddr,
                    "connectState"  : center.connectState}

        response.json({"result" : true,
                       "date" : date})
      }else {
        response.json({"result" : false})
      }
    })
  }else {
    response.json({"result" : false})
  }
}

function createCenter(request, response) {
  // body...

  var familyKey_create = request.body.familyKey
  var macAddr_create   = request.body.macAddr
  var connectState     = request.body.connectState
  console.log("create center by familyKey: "+ familyKey_create);
  console.log("create center by macAddr: "+ macAddr_create);


  if (familyKey_create && macAddr_create ) {
    Center.create({
        familyKey     : familyKey_create,
        macAddr       : macAddr_create,

        connectState  : connectState},
    function(error, center){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.json({"result" : "success"})
      }
    })
  }else {
    response.json({"result" : "fail"})
  }


}

function updateCenter(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log(familyKey_find);
  console.log(macAddr_find);

  if (familyKey_find && macAddr_find ) {

    Center.findOne({familyKey : familyKey_find,
                    macAddr  : macAddr_find },

    function(error, center) {
        // body...
        if (error) {
          response.end(error)
        }
        if (center) {
          // if (request.body.familyKey) {
          //     center.familyKey       = request.body.familyKey;
          //   }
          // if (request.body.macAddr) {
          //     center.macAddr         = request.body.macAddr;
          //   }

          if (request.body.connectState) {
              center.connectState    = request.body.connectState;
            }
          // response.send(center)
          return center.save(function(error) {
            if (error) {
              response.send(error);
            }else {
              response.json({"result" : "success"})              // return response.send(phone);
            }
          });
        }else {
          response.json({"result" : "no such device"})
        }

      })

  }else {
    response.json({"result" : "fail"})
  }


}

function deleteCenter(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var macAddr_find   = request.body.macAddr

  console.log(familyKey_find);
  console.log(macAddr_find);

  Center.findOne({familyKey : familyKey_find,
                  macAddr   : macAddr_find },

  function(error, center) {
      // body...
      if (error) {
        response.end(error)
      }

      if (center) {
          // response.send(center)
          center.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.send("success")
            }
          })
      }else {
        response.send("no such device")
      }
    })
}

function deleteCenterById(request, response) {
  // body...
  var id_find   = request.body.identifier
  console.log(id_find);

  Center.findOne({_id  : id_find },
  function(error, center) {
      // body...
      if (error) {
        response.end(error)
      }
      if (center) {
          // response.send(center)
          center.remove(function (error) {
            // body...
            if (error) {
              response.send(error)
            }else {
              response.send("success")
            }
          })
      }else {
        response.send("no such device")
      }
    })
}

module.exports = {
  allCenter     : allCenter,
  familyCenter  : familyCenter,
  getCenterFamilyKey    : getCenterFamilyKey,
  createCenter  : createCenter,
  updateCenter  : updateCenter,
  deleteCenter  : deleteCenter,
  deleteCenterById  : deleteCenterById,
  centerExist   : centerExist,
  Center  : Center

}
