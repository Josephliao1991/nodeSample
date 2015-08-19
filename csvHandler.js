var json2csv = require('json2csv');


function saveToCSV(fileName, acce, gyro, callback) {
  // body...
  var acce_json = []
  var gyro_json = []

  for (var i = 0; i < acce.date.length; i++) {
    acce_json.push({date    : acce["date"][i],
                    xvalue  : acce["xvalue"[i],
                    yvalue  : acce["yvalue"[i],
                    zvalue  : acce["zvalue"][i]})
  }

  console.log("Acce_Json [0] : "+acce_json[0]);

  for (var i = 0; i < gyro.date.length; i++) {
    gyro_json.push({date    : gyro["date"][i],
                    xvalue  : gyro["xvalue"[i],
                    yvalue  : gyro["yvalue"[i],
                    zvalue  : gyro["zvalue"][i]})
  }

  console.log("Gyro_Json [0] : "+gyro_json[0]);

}


callback(null,true)









module.exports = {

  saveToCSV   : saveToCSV

}
