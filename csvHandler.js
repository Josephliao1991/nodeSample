var json2csv = require('json2csv');
var fs = require('fs');

var fileDirect = './csv/'
function writeFile(name) {
    return fs.createWriteStream(fileDirect + name);
}

function saveToCSV(fileName, acce, gyro) {
  // body...
  var acce_json = []
  var gyro_json = []

  var fields = ['date','xvalue','yvalue','zvalue']

  for (var i = 0; i < acce.date.length; i++) {
    acce_json.push({date    : acce["date"][i],
                    xvalue  : acce["xvalue"][i],
                    yvalue  : acce["yvalue"][i],
                    zvalue  : acce["zvalue"][i]})
  }

  // console.log("Acce_Json [0] : "+acce_json[0]["xvalue"]);

  for (var i = 0; i < gyro.date.length; i++) {
    gyro_json.push({date    : gyro["date"][i],
                    xvalue  : gyro["xvalue"][i],
                    yvalue  : gyro["yvalue"][i],
                    zvalue  : gyro["zvalue"][i]})
  }

  // console.log("Gyro_Json [0] : "+gyro_json[0]["xvalue"]);

  json2csv({data:acce_json, feilds: fields},function (error, csv) {
    // body...
    if (error) {
      console.log(error);
    }
    console.log("acce"+csv);
    // csv.pipe(writeFile(fileName+'_acce'+'.csv'));
    fs.writeFile(fileDirect+fileName+'_acce'+'.csv',csv,function (error) {
      // body...
      if (error) {
        console.log(error);
      }

      console.log("save success");

    })

  })

  json2csv({data:gyro_json, feilds: fields},function (error, csv) {
    // body...
    if (error) {
      console.log(error);
    }
    console.log("gyro"+csv);
    // csv.pipe(writeFile(fileName+'_gyro'+'.csv'));

  })




}












module.exports = {

  saveToCSV   : saveToCSV

}
