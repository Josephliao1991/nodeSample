var mongoose = require('mongoose');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,
    operation   : String
});

// function allPhone(callback) {
//   // body...
//   Phone.find(function(error, phones) {
//     // body...
//     if (error) {
//       return callback(error)
//     }else {
//       callback(null, phones)
//     }
//   })
// }

function allPhone(resquest, resopnse) {
  // body...
  // var req = resquest
  // var res = resopnse

  Phone.find(function(error, phones) {
    // body...
    if (error) {
      resopnse.send(error)
    }else {
      resopnse.send(phones)
    }
  })
}

// function familyPhone(familyKey, callback) {
//   // body...
//   Phone.find({familyKey:familyKey},function(error, phones) {
//       // body...
//       if (error) {
//         return callback(error)
//       }else {
//         callback(null, phones)
//       }
//     })
// }

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
        response.send(phones)
      }
    })
}

// function createPhone(request, callback) {
//   // body...
//
//   Phone.create({
//       familyKey   : request.body.familyKey,
//       deviceToken : request.body.deviceToken,
//       operation   : request.body.operation
//   },function(error, phone){
//     // body...
//     if (error) {
//         return callback(error)
//     }else {
//         // response.json(phone)
//         callback(null, "success")
//     }
//   })
//
// }

function createPhone(request, response) {
  // body...

  Phone.create({
      familyKey   : request.body.familyKey,
      deviceToken : request.body.deviceToken,
      operation   : request.body.operation
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
    }
    phone.save(function(error) {
      if (error) {
        response.send(error)
       }else {
        response.send("success")
       }
      });
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
      }
  })
}

function deletePhoneById(request, response) {
  // body...
  var id_find  = request.body.identifier

  console.log(familyKey_find);
  console.log(deviceToken_find);

  Phone.findById({_id   : id_find},
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
      }
  })
}


module.exports = {

  allPhone     :allPhone,
  familyPhone  :familyPhone,
  createPhone  :createPhone,
  updatePhone  :updatePhone,
  deletePhone  :deletePhone,
  deletePhoneById   : deletePhoneById

}
