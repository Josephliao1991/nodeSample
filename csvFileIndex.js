var mongoose = require('mongoose');

//Create iNeDot Mongodb Module
var csvFile = mongoose.model('csvfile', {
    fileName     : String,

});

function checkFileExist(fileName,callback) {
  // body...
  csvFile.find({fileName : fileName}, function (error,csvFile) {
    // body...
    if (error) {
      callback(error)
    }

    if (csvFile.length>0) {
      callback(null,csvFile)
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

    var fileName_accs = fileName+'_accs'
    var fileName_gyro = fileName+'_gyro'

    if (!exist) {
      csvFile.create({fileName : fileName_accs},function (error,csvFile) {
        // body...
        console.log("CSV FILE IS SAVE!!  ",+csvFile.fileName);

      })

      csvFile.create({fileName : fileName_gyro},function (error,csvFile) {
        // body...
        console.log("CSV FILE IS SAVE!!  ",+csvFile.fileName);

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
