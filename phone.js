var mongoose = require('mongoose');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,
    operation   : String
});

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
      console.log(phones.length);
      return phones;

    }
  )

}

module.exports = {

  allPhone     :allPhone,
  familyPhone  :familyPhone,
  createPhone  :createPhone,
  updatePhone  :updatePhone,
  deletePhone  :deletePhone,
  deletePhoneById   : deletePhoneById,

  getFamilyMember  : getFamilyMember

}
