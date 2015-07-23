var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;
//
mongoose.connect('mongodb://'+argv.be_ip+':80/my_database');

  var family = mongoose.model('family', {
    familyKet : String,
    deviceToken: String
  });

  var app = express();


  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended: true}))
  app.use(bodyparser.json({ type: 'application/vnd.api+json' }))
  app.use(methodOverride())

  app.get('/',function(request,response){

    response.end("Hello world");

  });

  app.get('/family',function(request, response){

    family.find(function(error, phone) {
      // body...
      if (error) {
          response.send(error);
      }

      response.json(phone)

    })

    // response.end("Get family");

  });

  app.post('/family',function(request, response){

    family.create({
        familyKey : request.body.familyKey,
        deviceToken : request.body.deviceToken
    },function(error, familyy){
      // body...
      if (error) {
          response.send(error)
      }


      family.find(function(error, familys) {
        // body...
        if (error) {
            response.send(error)
        }

        response.json(familys)

      })
    })

    // var familyKey = request.body.familyKey;
    // response.end("Post family : " + familyKey);

  });

  // app.put('/family/:id',function(request, response){
  //   // body...
  //   var id = request.params.id
  //   if (id == "abc123") {
  //
  //     var familyKey = request.body.familyKey;
  //     response.end("Put family : " + familyKey);
  //   }else {
  //
  //     response.end("Wrong id");
  //   }
  // })

  // app.delete('/family/:id',function(request, response){
  //   // body...
  //   var id = request.params.id
  //   if (id == "abc123") {
  //     response.end("Delete family")
  //   }else {
  //     response.end("Wrong Id")
  //   }
  //
  // })

  // var server = app.listen(process.env.PORT||'8888','10.240.5.134',function(request, response) {
  //   console.log('App listening at http://%s:%s', server.address().address, server.address().port);
  //   console.log("Press Ctrl+C to quit.");
  // });

  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
