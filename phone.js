var mongoose = require('mongoose');
var QRHandler = require('./QRHandler.js');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,
    operation   : String
});

function checkFamilyExist(familyKey,callback) {
  // body...
  Phone.find({familyKey:familyKey},function(error, phones) {
    // body...
    if (error) {
      return error
    }

    console.log(phones);
    if (phones.length = 0) {
      return callback(null,false)
    }else {
      return callback(null,true)
    }
  })
}


function allPhone(resquest, resopnse) {
  // body...

  Phone.find(function(error, phones) {
    // body...
    if (error) {
      resopnse.send(error)
    }else {
      resopnse.json(phones)
    }
  })
}

function familyPhone(request, response) {
  // body...
  var familyKey_find = request.query.familyKey
  console.log('familyKey:'+ familyKey_find);

  Phone.find({familyKey:familyKey_find},function(error, phones) {
      // body...
      if (error) {
        response.send(error)
      }
      if (phones) {
        response.json(phones)
      }
    })
}

function getQRPhone(request, response) {
  // body...
  var name = request.query.familyKey
  // console.log(name);

  checkFamilyExist(name,function (error,exist) {
    // body...
    console.log(exist);
    if (exist == true) {
      console.log("exist");
    }else {
      console.log("dosen't exist");
    }
  })

  // if (name) {
  //   var exist = checkFamilyExist()
  //
  // }

  // if (name) {
  //   Phone.find({familyKey:name},function(error, phones) {
  //       // body...
  //       if (error) {
  //         response.send(error)
  //       }
  //       if (phones.length > 0) {
  //         // response.send(phones)
  //         QRHandler.readqr(name+".png").pipe(response)
  //       }else {
  //         response.send("fail")
  //       }
  //     })
  //
  // }else {
  //   response.end("fail")
  // }

}

function createPhone(request, response) {
  // body...
  var familyKey_create    = request.body.familyKey
  var deviceToken_create  = request.body.deviceToken
  var operation_create    = request.body.operation

  if (familyKey_create == deviceToken_create) {
    QRHandler.createqr(familyKey_create)
  }

  Phone.create({
      familyKey   : familyKey_create,
      deviceToken : deviceToken_create,
      operation   : operation_create
  },function(error, phone){
    // body...
    if (error) {
      resopnse.send(error)
    }else {
      response.send("success")
    }
  })


}

function updatePhone(request, response) {
  // body...
  var familyKey_find = request.body.familyKey
  var deviceToken_find   = request.body.deviceToken

  console.log(familyKey_find);
  console.log(deviceToken_find);

  Phone.findOne({familyKey     : familyKey_find,
                 deviceToken   : deviceToken_find },
  function(error, phone) {
    if (error) {
      response.send(error)
    }
    if (phone) {

      if (request.body.operation) {
          phone.operation    = request.body.operation;
      }

      phone.save(function(error) {
        if (error) {
          response.send(error)
         }else {
          response.send("success")
         }
      });

    }else {
      response.send("no such device")
    }

  });
}

function deletePhone(request, response) {
  // body...
  var familyKey_find    = request.body.familyKey
  var deviceToken_find  = request.body.deviceToken

  console.log(familyKey_find);
  console.log(deviceToken_find);

  Phone.findOne({familyKey     : familyKey_find,
                 deviceToken   : deviceToken_find },
  function(error, phone) {
      // body...
      if (error) {
        response.send(error)
      }
      if (phone) {
        // console.log("wait for delete : " + phone);
        phone.remove(function (error) {
          // body...
          if (error) {
            response.send(error)
          }else {
            // console.log("Delete success");
            response.send("success")
          }
        })
      }else {
        response.send("no such device")
      }
  })
}

function deletePhoneById(request, response) {
  // body...
  var id_find  = request.body.identifier
  console.log(id_find);

  Phone.findOne({_id   : id_find},
  function(error, phone) {
      // body...
      if (error) {
        response.send(error)
      }
      if (phone) {
        // console.log("wait for delete : " + phone);
        phone.remove(function (error) {
          // body...
          if (error) {
            response.send(error)
          }else {
            // console.log("Delete success");
            response.send("success")
          }
        })
      }else {
        response.send("no such device")
      }
  })
}

/*=====================================================*/
function getFamilyMember(familyKey_find) {
  // body...
  Phone.find({familyKey  : familyKey_find},
    function (error,phones) {
      // body...
      // console.log(phones.length);
      // console.log(phones[0].familyKey);
      // var members = []
      // members = phones
      // for (var i = 0; i < phones.length; i++) {
      //   console.log(phones[i].deviceToken)
      // }

      return phones[0].deviceToken;

    }
  )

}

module.exports = {

  allPhone     :allPhone,
  familyPhone  :familyPhone,
  getQRPhone   : getQRPhone,
  createPhone  :createPhone,
  updatePhone  :updatePhone,
  deletePhone  :deletePhone,
  deletePhoneById   : deletePhoneById,

  getFamilyMember  : getFamilyMember,

  Phone   : Phone

}
