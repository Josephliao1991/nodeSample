// var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;
var path = require('path');
var mime = require('mime');
var phone = require('./phone.js');
var inedot = require('./inedot.js');
var center = require('./center.js');
var cpush = require('./c-push.js');
var push = require('./push.js');
var troubleHandler = require('./troubleHandler.js');
var csvHandler = require('./csv/csvHandler.js');
var csvFileIndex = require('./csvFileIndex.js');
var csvFile = require('./csv/csvFile.js');
  //Connect to Mongodb
  // mongoose.connect('mongodb://'+argv.be_ip+':80/familyDatabase');
  // mongoose.connect('mongodb://10.240.72.88:80/familyDatabase'); //myTest Server
  mongoose.connect('mongodb://10.240.17.142:80/familyDatabase');

  //set express to app
  var app = express();
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded(
    { extended: true,
      parameterLimit: 10000,
      limit: 1024 * 1024 * 50}))

  app.use(bodyparser.json(
    { type: 'application/vnd.api+json',
      parameterLimit: 10000,
      limit: 1024 * 1024 * 50 }))
  app.use(methodOverride())
//   app.use(function(req, res, next) {
//     var data = [];
//     req.on("data", function(chunk) {
//       console.log("chunk : "+chunk);
//         data.push(new Buffer(chunk));
//     });
//     req.addListener("end", function() {
//         buffer = Buffer.concat(data);
//         console.log("buffer : "+buffer);
//         // zlib.inflate(buffer, function(err, result) {
//         //     if (!err) {
//         //         req.body = result.toString();
//         //         next();
//         //     } else {
//         //         next(err);
//         //     }
//         // });
//     });
// });

  //Testing api
  app.get('/',function(request,response){
    response.end("Hello world, This is iNeDot Server!");
  });

  app.get('/fail',function(request,response,next){

    setTimeout(function () {
      var nu = null;
      nu.access();

      res.send('Hello World');
  }, 1000);

    // response.end("Hello world, This is iNeDot Server!");
  });
/*===========================PHONE==================================*/
  //implement /family/phone/ API
  app.get('/family/phone/all',function(request, response){
      var res = response
      var req = request
      phone.allPhone(req, res)
  });

  app.get('/family/phone',function(request, response){
    var req = request
    var res = response
    phone.familyPhone(req, res)
  });

  app.get('/family/phone/getQR',function (request, response) {
    // body...
    var req = request
    var res = response
    phone.getQRPhone(req, res)
  })

  app.get('/family/phone/familyExist',function (request, response) {
    // body...
    var req = request
    var res = response
    phone.familyExist(req, res)
  })

  app.get('/family/phone/phoneExist',function (request, response) {
    // body...
    var req = request
    var res = response
    phone.phoneExist(req, res)
  })

  app.post('/family/phone/create',function(request, response){
    var req = request
    var res = response
    phone.createPhone(req, res)
  });

  app.post('/family/phone/update',function(request, response){
    // body...
    var req = request
    var res = response
    phone.updatePhone(req, res)
  })

  app.post('/family/phone/zoreBadgeNumber', function (request, response) {
    // body...
    var req = request
    var res = response
    phone.zorePhoneBedgeNumber(req, res)
  })

  app.post('/family/phone/delete',function(request, response){
    // body...
    var res = response
    var req = request
    phone.deletePhone(req, res)
  })

  app.post('/family/phone/deleteById', function(request, response) {
    // body...
    var res = response
    var req = request
    phone.deletePhoneById(req, res)
  })

/*===========================iNeDot==================================*/
  //implement /family/inedot/ API
  app.get('/family/inedot/all',function(request, response){
    var req = request
    var res = response
    inedot.alliNeDot(req, res)
  });

  app.get('/family/inedot/owner',function(request, response){
    var res = response
    var req = request
    inedot.familyOwneriNeDot(req, res)
  });

  app.get('/family/inedot',function(request, response){
    var res = response
    var req = request
    inedot.familyiNeDot(req, res)
  });

  app.get('/family/inedot/inedotExist',function (request, response) {
    // body...
    var req = request
    var res = response
    inedot.inedotExist(req, res)
  })

  app.post('/family/inedot/create',function(request, response){
    var req = request
    var res = response
    inedot.createiNeDot(req, res)
  });

  app.post('/family/inedot/update',function(request, response){
    // body...
    var req = request
    var res = response
    inedot.updateiNeDot(req, res)
  });

  app.post('/family/inedot/delete',function(request, response){
    // body...
    var req = request
    var res = response
    inedot.deleteiNeDot(req, res)
  })

  app.post('/family/inedot/deleteById',function(request, response){
    // body...
    var req = request
    var res = response
    inedot.deleteiNeDotById(req, res)
  })

/*===========================CENTER==================================*/

  //implement /family/inedot/ API
  app.get('/family/center/all',function(request, response){

    var req = request
    var res = response
    center.allCenter(req, res)
  });

  app.get('/family/center',function(request, response){

    var req = request
    var res = response
    center.familyCenter(req, res)
  });

  app.get('/family/center/getFamilyKey',function(request, response) {
    // body...
    var req = request
    var res = response
    center.getCenterFamilyKey(request, response)
  })

  app.get('/family/center/centerExist',function (request, response) {
    // body...
    var req = request
    var res = response
    center.centerExist(req, res)
  })

  app.post('/family/center/create',function(request, response){
    var req = request
    var res = response
    center.createCenter(req, res)
  });

  app.post('/family/center/update',function(request, response){
    // body...
    var req = request
    var res = response
    center.updateCenter(req, res)
  });

  app.post('/family/center/delete',function(request, response){
    // body...
    var req = request
    var res = response
    center.deleteCenter(req, res)
  })

  app.post('/family/center/deleteById',function(request, response){
    // body...
    var req = request
    var res = response
    center.deleteCenterById(req, res)
  })


/*===========================C_PUSH==================================*/

  //implement /family/inedot/ API
  app.get('/family/c_push/all',function(request, response){
    var req = request
    var res =response
    cpush.allCPush(req, res)
  });

  app.get('/family/c_push',function(request, response){
    var req = request
    var res = response
    cpush.familyCPush(req, res)
  });

  app.get('/family/c_push_json',function(request, response){
    var req = request
    var res = response
    cpush.familyCPush_JSON(req, res)
  });

  app.post('/family/c_push/create',function(request, response){
    var req = request
    var res = response
    cpush.createCPush(req, res)
  });

  app.post('/family/c_push/update',function(request, response){
    // body...
    var req = request
    var res = response
    cpush.updateCPush(req, res)
  });

  app.post('/family/c_push/changeCheckMark',function(request, response){
    // body...
    var req = request
    var res = response
    cpush.changeCPushCheckMark(req, res)
  })

  app.post('/family/c_push/delete',function(request, response){
    // body...
    var req = request
    var res = response
    cpush.deleteCPush(req, res)
  })

/*===========================HOME ALERT API==================================*/

  app.post('/monitor', function(request, response) {
    // body...
    var req = request
    var res = response
    push.sendPush(req, res)
  })

  /*===========================TROUBLE RESPONSE API==================================*/

  app.post('/trouble', function (request, response) {
    // body...
    var req = request
    var res = response
    troubleHandler.troubleHandler(req, res)
  })

  /*===========================TestinG API==================================*/

  app.post('/test',function (request, response) {
    // body...
    var name = request.body.test
    console.log("Alice Test name is : "+name);
    response.send("Alice Test name is : "+name);

  })

  app.get('/push',function (request, response) {
    // body...
    var req = request
    var res = response
    push.pushTest(req, res)
  })

  app.get('/family/c_push/changeCheckMarkTest',function(request, response){
    // body...
    var req = request
    var res = response
    cpush.changeCPushCheckMarkTest(req, res)
  })

  app.post('/family/c_push/changeDataTest',function(request, response){
    // body...
    var req = request
    var res = response
    cpush.changeCPushDataTest(req, res)
  })

  app.post('/upload/data',function(request, response){
    // body...

    // var req = request
    // var res = response


    console.log("Upload Data testing");

    var fileName = request.body.fileName
    var type     = request.body.type
    var acce     = request.body.acce[0]
    var gyro     = request.body.gyro[0]
    //

    console.log("FileName : "+fileName);
    console.log("Type : "+type);
    console.log("Acce : "+acce);
    console.log("Gyro : "+gyro);
    console.log("acce datalength : "+acce.date.length);

    // csvFileIndex.createFile(fileName)

    if (type == "continue") {

      //save to mongodb
      csvFile.createcsvFileData(fileName, "acce", acce);
      csvFile.createcsvFileData(fileName, "gyro", gyro);
    }else if (type == "done") {

      csvFileIndex.createFile(fileName)
      push.uploadFilePushAlert(fileName);

      csvFile.createcsvFileData(fileName, "acce", acce, function (error) {
        // body...
        if (error) {
          console.log(error);
        }
        // csvHandler.saveAcceToCSV(fileName)
        // csvFileIndex.createFile(fileName)
        // push.uploadFilePushAlert(fileName);
      });

      csvFile.createcsvFileData(fileName, "gyro", gyro, function (error) {
        // body...
        if (error) {
          console.log(error);
        }
        // csvHandler.saveGyroToCSV(fileName)
        // csvFileIndex.createFile(fileName)
        // push.uploadFilePushAlert(fileName);
      });

    }

    response.json({"result":"Upload Data testing"})
  })



  app.get('/download/data/',function(request, response){
    // body...
    var req = request
    var res = response
    var fileName = request.query.fileName
    var fileType  = request.query.fileType
    console.log("FileName: ",fileName);

    if (!fileType || !fileName) {
      response.end("lostsome params")
    }

    if (fileType == "gyro") {

    console.log("GYRO FILE CREATE");

      csvHandler.saveGyroToCSV(fileName,function (error,success) {
        // body...
        if (error) {
          response.send(error)
        }

        if (success) {
          // response.send("GYRO FILE CREATE Success")
          csvFileIndex.checkFileExist(fileName+"_gyro", function (error,exist) {
            // body...
            if (exist) {
              var file = __dirname + '/csv/'+fileName+'_gyro.csv';
              console.log("File dirname : "+file);
              var filename = path.basename(file);
              var mimetype = mime.lookup(file);
              console.log("fileName: "+filename);
              console.log("mimeType: "+mimetype);
              response.setHeader('Content-disposition', 'attachment; filename=' + filename);
              response.setHeader('Content-type', mimetype);
              csvHandler.readCSVFile(fileName+'_gyro').pipe(response);
              // var filestream = fs.createReadStream(file);
              // filestream.pipe(res);
            }else {
              response.end("File Is Not Esixt,Please Check Your File Name! \n <FileName>_accs or <FileName>_gyro ")
            }

          })
        }
      })

    }else if ("acce") {

      console.log("ACCE FILE CREATE");

      csvHandler.saveAcceToCSV(fileName,function (error,success) {
        // body...
        if (error) {
          response.send(error)
        }

        if (success) {
          // response.send("ACCE FILE CREATE Success")

          csvFileIndex.checkFileExist(fileName+"_accs", function (error,exist) {
            // body...
            if (exist) {
              var file = __dirname + '/csv/'+fileName+'_accs.csv';
              console.log("File dirname : "+file);
              var filename = path.basename(file);
              var mimetype = mime.lookup(file);
              console.log("fileName: "+filename);
              console.log("mimeType: "+mimetype);
              response.setHeader('Content-disposition', 'attachment; filename=' + filename);
              response.setHeader('Content-type', mimetype);
              csvHandler.readCSVFile(fileName+'_accs').pipe(response);
              // var filestream = fs.createReadStream(file);
              // filestream.pipe(res);
            }else {
              response.end("File Is Not Esixt,Please Check Your File Name! \n <FileName>_accs or <FileName>_gyro ")
            }

          })

        }
      //

      })

    }else {
      response.end("File Is Not Esixt,Please Check Your File Name! \n <FileName>_accs or <FileName>_gyro ")
    }


  })

  app.get('/uploadAlertPush',function (request, response) {
    // body...
    var req = request
    var res = response
    push.uploadFilePushAlert("UploadAlertTest");
  })

  app.post('/upload/check',function(request, response){
    // body...
    var req = request
    var res = response
    response.json({"result":"Cehck FileName testing"})
    console.log("Cehck FileName testing");
  })

  app.post('/array', function (request, response) {
    // body...
    var array = request.body.array;
    console.log(array);
    console.log(array[0]);

    var jsonString = "{\"key\":\"value\"}";
    var jsonObj = JSON.parse(jsonString);
    console.log(jsonObj.key);

    // var jsonString = "{\"key\":\"value\"}";
    var jsonObjArray = JSON.parse(array);
    console.log(jsonObjArray);

  })
  // app.listen(8080,argv.fe_ip,function(request, response) {
  // app.listen(80,argv.fe_ip,function(request, response) {
  // app.listen(80,'10.240.203.56',function(request, response) { //My Test Server
  app.listen(80,'10.240.125.145',function(request, response) {

    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
