var mongoose = require('mongoose');

//Create iNeDot Mongodb Module
var csvFile = mongoose.model('csvfile', {
    fileName     : String,

});

function checkFileExist(fileName,callback) {
  // body...
  csvFile.findOne({fileName : fileName}, function (error,csvFile) {
    // body...
    if (error) {
      callback(error)
    }

    if (csvFile) {
      callback(null,1)
    }else {
      callback(null,null)
    }

  })

}


function createFile(fileName) {
  // body...

  checkFileExist(fileName, function (error,exist) {
    // body...
    if (error) {
      console.log("fileExist Erroe: "+error);
    }

    if (!exist) {
      csvFile.create({fileName : fileName},function (error,csvFile) {
        // body...
        console.log("CSV FILE IS SAVE!!  ",+csvFile);

      })
    }else {
      console.log("CSV FILE NAME IS EXIST!");
    }

  })
}



module.exports = {

  checkFileExist  : checkFileExist,
  createFile      : createFile,

  csvFile         : csvFile

}
