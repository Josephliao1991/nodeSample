var mongoose = require('mongoose');

//Create Center Mongodb Module
var csvFile = mongoose.model('csvfile', {
    fileName     : String,
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

                  // console.log("CSVFILE"+csvFile);

                  callback('null',csvFile);


                }).sort({dete:1})


}


function createcsvFileData(fileName, type, data, callback) {
  // body...

  console.log("Type : "+type +"length : "+ data.date.length);

  for (var i = 0; i < data.date.length; i++) {

    var _date   = data["date"][i]
    var _xvalue = data["xvalue"][i]
    var _yvalue = data["yvalue"][i]
    var _zvalue = data["zvalue"][i]

    // console.log("_date: "+_date);
    // console.log("_xvalue: "+_xvalue);
    // console.log("_yvalue: "+_yvalue);
    // console.log("_zvalue: "+_zvalue);

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
                      // console.log(fileName+ "save success");
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
