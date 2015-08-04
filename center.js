var mongoose = require('mongoose');

//Create Center Mongodb Module
var Center = mongoose.model('center', {
    familyKey     : String,
    macAddr       : String,

    connectState  : Boolean,
});

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







module.exports = {
  allCenter   : allCenter

}
