var mongoose = require('mongoose');

//Create iNeDot Mongodb Module
var csvFileIndex = mongoose.model('csvfileindex', {
    fileName     : String,

});

function checkFileExist(fileName,callback) {
  // body...
  csvFileIndex.find({fileName : fileName}, function (error,csvFileIndex) {
    // body...
    if (error) {
      callback(error)
    }

    if (csvFileIndex.length>0) {
      callback(null,csvFileIndex)
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
      csvFileIndex.create({fileName : fileName_accs},function (error,csvFileIndex) {
        // body...
        console.log("CSV FILE IS SAVE!!  ",+csvFileIndex.fileName);

      })

      csvFileIndex.create({fileName : fileName_gyro},function (error,csvFileIndex) {
        // body...
        console.log("CSV FILE IS SAVE!!  ",+csvFileIndex.fileName);

      })

    }else {
      console.log("CSV FILE NAME IS EXIST!");
    }

  })
}



module.exports = {

  checkFileExist  : checkFileExist,
  createFile      : createFile,

  csvFileIndex         : csvFileIndex

}
