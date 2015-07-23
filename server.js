var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');

var mongoose = require('mongoose');
var ip = '10.240.212.168'

mongoose.connect('mongodb:/10.240.212.168:80/db');

  var family = mongoose.model('family', {
    familyKet : String,
    deviceToken: String
  });

  var app = express();


  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({
    extended: true
  }))

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

    response.end("Get family");

  });

  app.post('/family',function(request, response){

    family.create({
        familyKey : request.body.familyKey,
        deviceToken : request.body.deviceToken
    },function(error, family){
      // body...
      if (error) {
          response.send(error)
      }

      family.find(function(error, family) {
        // body...
        if (error) {
            response.send(error)
        }

        response.json(family)

      })
    })
    var familyKey = request.body.familyKey;
    response.end("Post family : " + familyKey);

  });

  app.put('/family/:id',function(request, response){
    // body...
    var id = request.params.id
    if (id == "abc123") {

      var familyKey = request.body.familyKey;
      response.end("Put family : " + familyKey);
    }else {

      response.end("Wrong id");
    }
  })

  app.delete('/family/:id',function(request, response){
    // body...
    var id = request.params.id
    if (id == "abc123") {
      response.end("Delete family")
    }else {
      response.end("Wrong Id")
    }

  })


  app.listen(8888)
  console.log("server start");
