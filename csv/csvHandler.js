var json2csv = require('json2csv');
var fs = require('fs');
var csvfile = require('./csvFile.js');

var fileDirect = './csv/'
function writeFile(name) {
    return fs.createWriteStream(fileDirect + name);
}

function readCSVFile(fileName) {
  // body...
  return fs.createReadStream(__dirname +'/'+fileName+'.csv');

}

function saveAcceToCSV(fileName) {
  // body...
  var acce_json = []
  // console.log("Save Acce data in CSV");
  csvfile.getCsvFile(fileName, "acce", function (error,data) {
    // body...
    var fields = ['date','xvalue','yvalue','zvalue']
    //
    for (var i = 0; i < data.length; i++) {
      acce_json.push({date    : data[i]["date"],
                      xvalue  : data[i]["xvalue"],
                      yvalue  : data[i]["yvalue"],
                      zvalue  : data[i]["zvalue"]})
    }

    json2csv({data:acce_json, feilds: fields},function (error, csv) {
      // body...
      if (error) {
        console.log(error);
      }
      // console.log("acce"+csv);
      // csv.pipe(writeFile(fileName+'_acce'+'.csv'));
      // csv.writeFile
      fs.writeFile(__dirname +'/'+fileName+'_accs'+'.csv',csv,function (error) {
        // body...
        if (error) {
          console.log(error);
        }
        // console.log("save success");

      })

    })

  })

}

function saveGyroToCSV(fileName) {
  // body...
  var gyro_json = []
  // console.log("Save Gyro data in CSV");

  csvfile.getCsvFile(fileName, "gyro", function (error,data) {

    var fields = ['date','xvalue','yvalue','zvalue']
    // console.log("Save Gyro data in CSV");
    for (var i = 0; i < data.length; i++) {
      gyro_json.push({date    : data[i]["date"],
                      xvalue  : data[i]["xvalue"],
                      yvalue  : data[i]["yvalue"],
                      zvalue  : data[i]["zvalue"]})
    }

    // console.log("Gyro_Json [0] : "+gyro_json[0]["xvalue"]);



    json2csv({data:gyro_json, feilds: fields},function (error, csv) {
      // body...
      if (error) {
        console.log(error);
      }
      // console.log("gyro"+csv);

      fs.writeFile(__dirname +'/'+fileName+'_gyro'+'.csv',csv,function (error) {
        // body...
        if (error) {
          console.log(error);
        }

        // console.log("save success");

      })

    })
  })

}


module.exports = {

  saveAcceToCSV   : saveAcceToCSV,
  saveGyroToCSV   : saveGyroToCSV,
  readCSVFile : readCSVFile
}
