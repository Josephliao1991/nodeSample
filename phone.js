var mongoose = require('mongoose');

var Phone = mongoose.model('phone', {
    familyKey   : String,
    deviceToken : String,
    operation   : String
});

function allPhone(callback) {
  // body...
  Phone.find(function(error, phones) {
    // body...
    if (error) {
      return callback(error)
    }else {
      callback(null, phones)
    }
  })
}

function familyPhone(familyKey, callback) {
  // body...
  Phone.find({familyKey:familyKey},function(error, phones) {
      // body...
      if (error) {
        return callback(error)
      }else {
        callback(null, phones)
      }
    })
}
function createPhone(request, callback) {
  // body...

  Phone.create({
      familyKey   : request.body.familyKey,
      deviceToken : request.body.deviceToken,
      operation   : request.body.operation
  },function(error, phone){
    // body...
    if (error) {
        return callback(error)
    }else {
        // response.json(phone)
        callback(null, "success")
    }
  })

}

function updatePhone(request, callback) {
  // body...
  var familyKey_find = request.body.familyKey
  var deviceToken_find   = request.body.deviceToken

  console.log(familyKey_find);
  console.log(deviceToken_find);

  Phone.findOne({familyKey     : familyKey_find,
                 deviceToken   : deviceToken_find },
  function(error, phone) {
    if (error) {
      return callback(error)
    }
    if (phone) {

      if (request.body.operation) {
          phone.operation    = request.body.operation;
      }
    }
    phone.save(function(error) {
      if (error) {
        return callback(error)
       }else {
         callback(null, "success")
       }
      });
    });
}

function deletePhone(request, callback) {
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
        return callback(error)
      }
      if (phone) {
          // response.send(center)
          phone.remove(function (error) {
            // body...
            if (error) {
              return callback(error)
            }else {
              callback(null, "success")
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
  deletePhone  :deletePhone

}
