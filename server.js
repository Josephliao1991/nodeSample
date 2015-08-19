// var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;
var phone = require('./phone.js');
var inedot = require('./inedot.js');
var center = require('./center.js');
var cpush = require('./c-push.js');
var push = require('./push.js');
var troubleHandler = require('./troubleHandler.js');
  //Connect to Mongodb
  mongoose.connect('mongodb://'+argv.be_ip+':80/familyDatabase');

  //set express to app
  var app = express();
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended: true}))
  app.use(bodyparser.json({ type: 'application/vnd.api+json' }))
  app.use(methodOverride())

  //Testing api
  app.get('/',function(request,response){
    response.end("Hello world, This is iNeDot Server!");
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
    var req = request
    var res = response

    response.json({"result":"Upload Data testing"})
    console.log("Upload Data testing");

    var fileName = req.body.fileName
    var type     = req.body.type
    var acce     = req.body.acce
    var gyro     = req.body.gyro


    console.log(acce.date);
    console.log(gyro[0].xvalue);
    // for (var i = 0; i < acce.length; i++) {
    //   acce.push(req.body.acce[i]);
    //   console.log("AccE : "+req.body.acce[i]);
    // }

    // for (var i = 0; i < gyro.length; i++) {
    //   gyro.push(req.body.gyro[i]);
    //   console.log("Gyro : "+req.body.gyro[i]);
    // }

    console.log("FileName : "+fileName);
    console.log("Type : "+type);
    console.log("Acce : "+acce);
    console.log("Gyro : "+gyro);

  })

  app.post('/upload/check',function(request, response){
    // body...
    var req = request
    var res = response
    response.json({"result":"Cehck FileName testing"})
    console.log("Cehck FileName testing");
  })

  // app.listen(8080,argv.fe_ip,function(request, response) {
  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
