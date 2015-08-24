var mongoose = require('mongoose');

//Create iNeDot Mongodb Module
var CsvFileIndex = mongoose.model('csvfileindex', {
    fileName     : String
});

function checkFileExist(fileName,callback) {
  // body...
  CsvFileIndex.find({fileName : fileName}, function (error,name) {
    // body...

    console.log("check file Exit : "+name);
    if (error) {
      callback(error)
    }

    if (name.length>0) {
      callback(null,name)
    }else {
      callback(null,null)
    }

  })

}


function createFile(fileName) {
  // body...

  // checkFileExist(fileName, function (error,exist) {
  //   // body...
  //   if (error) {
  //     console.log("fileExist Erroe: "+error);
  //   }

    var fileName_accs = fileName+'_accs'
    var fileName_gyro = fileName+'_gyro'

    console.log("fileName_accs : "+fileName_accs);
    console.log("fileName_gyro : "+fileName_gyro);

    // if (!exist) {
      CsvFileIndex.create({fileName : fileName_accs},function (error,name) {
        // body...
        if (error) {
          console.log(error);
        }
        if (name) {
          console.log("CSV FILE index IS SAVE!!  ",+name);
        }


      })

      CsvFileIndex.create({fileName : fileName_gyro},function (error,name) {
        // body...

        if (error) {
          console.log(error);
        }
        if (name) {
          console.log("CSV FILE index IS SAVE!!  ",+name);
        }

      })

    // }else {
    //   console.log("CSV FILE NAME IS EXIST!");
    // }

  // })
}



module.exports = {

  checkFileExist  : checkFileExist,
  createFile      : createFile,

  CsvFileIndex         : CsvFileIndex

}
