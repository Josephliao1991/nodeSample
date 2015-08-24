var json2csv = require('json2csv');
var fs = require('fs');
var csvfile = require('./csvfile.js');

var fileDirect = './csv/'
function writeFile(name) {
    return fs.createWriteStream(fileDirect + name);
}

function readCSVFile(fileName) {
  // body...
  return fs.createReadStream(__dirname +'/'+fileName+'.csv');

}

function saveToCSV(fileName) {
  // body...
  var acce_json = []
  var gyro_json = []

  csvfile.getCsvFile(fileName, "acce", function (error,data) {
    // body...
    var fields = ['date','xvalue','yvalue','zvalue']

    for (var i = 0; i < date.length; i++) {
      acce_json.push({date    : acce["date"][i],
                      xvalue  : acce["xvalue"][i],
                      yvalue  : acce["yvalue"][i],
                      zvalue  : acce["zvalue"][i]})
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
        console.log("save success");

      })

    })

  })




  csvfile.getCsvFile(fileName, "gyro", function (error,data) {

    for (var i = 0; i < gyro.date.length; i++) {
      gyro_json.push({date    : gyro["date"][i],
                      xvalue  : gyro["xvalue"][i],
                      yvalue  : gyro["yvalue"][i],
                      zvalue  : gyro["zvalue"][i]})
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

        console.log("save success");

      })

    })
  })




  // console.log("Acce_Json [0] : "+acce_json[0]["xvalue"]);


}




module.exports = {

  saveToCSV   : saveToCSV,
  readCSVFile : readCSVFile
}
