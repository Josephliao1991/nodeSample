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

function updatePhone(familyKey, deviceToken, request, callback) {
  // body...
  Phone.findOne({familyKey     : familyKey,
                 deviceToken   : deviceToken },
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

module.exports = {

  allPhone     :allPhone,
  familyPhone  :familyPhone,
  updatePhone  :updatePhone

}
