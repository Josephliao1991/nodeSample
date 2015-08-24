var mongoose = require('mongoose');

//Create Center Mongodb Module
var csvFile = mongoose.model('csvFile', {
    filaName     : String,
    type         : String,
    xvalue       : Number,
    yvalue       : Number,
    zvalue       : Number,
    date         : Date
});

function getCsvFile(fileName, type, callback) {
  // body...
  csvFile.find({fileName  : fileName,
                type      : type},function (error,csvFile) {
                  // body...

                  if (error) {
                    callback(null)
                    console.log(error);
                  }

                  callback('null',saveFile);


                })


}


function createcsvFileData(fileName, type, data, callback) {
  // body...

  for (var i = 0; i < data.length; i++) {

    var _date   = date[i].date
    var _xvalue = data[i].xvalue
    var _yvalue = data[i].yvalue
    var _zvalue = data[i].zvalue

    csvFile.create({fileName  : fileName,
                    type      : type,
                    date      : _date,
                    xvalue    : _xvalue,
                    yvalue    : _yvalue,
                    zvalue    : _zvalue},
                  function (error,csvFile) {
                    // body...
                    if (error) {
                      if (callback) {
                        callback(1);
                      }
                      console.log(error);
                    }

                    if (csvFile) {
                      console.log(fileName+ "save success");
                      if (callback) {
                        callback(null);

                      }
                    }

                  })
  }
}

module.exports = {

  createcsvFileData   :   createcsvFileData,
  getCsvFile          :   getCsvFile


}
