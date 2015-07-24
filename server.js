var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;
//
mongoose.connect('mongodb://'+argv.be_ip+':80/my_database');

  var Phone = mongoose.model('phone', {
      familyKey   : String,
      deviceToken : String,
      company     : String
  });

  var app = express();
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended: true}))
  app.use(bodyparser.json({ type: 'application/vnd.api+json' }))
  app.use(methodOverride())


  app.get('/',function(request,response){
    response.end("Hello world, This is iNeDot Server!");
  });


  app.get('/family/phone/all',function(request, response){

      Phone.find(function(error, phones) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(phones)
        }

      })

  });

  app.get('/family/phone',function(request, response){

    var familyKey_find = request.query.familyKey
    console.log('familyKey:'+ familyKey_find);

      Phone.find({familyKey:familyKey_find},function(error, phones) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(phones)
        }

      })

  });

  app.post('/family/phone',function(request, response){

    Phone.create({
        familyKey   : request.body.familyKey,
        deviceToken : request.body.deviceToken,
        company    : request.body.company
    },function(error, phone){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.send("success")
      }
      // family.find(function(error, familys) {
      //   // body...
      //   if (error) {
      //       response.send(error)
      //   }
      //
      //   response.json(familys)
      //
      // })
    })

  });

  app.put('/family/phone',function(request, response){
    // body...

    return Phone.findById(request.body.identifier, function(error, phone) {

      if (error) {
        response.end(error)
      }else {

        if (phone) {

          if (request.body.familyKey) {
              phone.familyKey    = request.body.familyKey;
          }

          if (request.body.deviceToken) {
              phone.deviceToken  = request.body.deviceToken;
          }

          if (request.body.company) {
              phone.company      = request.body.company;
          }
        }

  	    return phone.save(function(error) {
  	      if (error) {
  	        response.send(error);
  	      }else {
  	        response.send("success")
            // return response.send(phone);
  	      }

  	    });

      }

	  });

  })

  app.delete('/family/phone',function(request, response){
    // body...

    var delete_id = request.body.identifier
    console.log(delete_id)

    Phone.remove({_id :delete_id}, function(error, phone) {


	      if (error) {
	        response.send(error);
	      }else {
	        response.send("success")
          // response.send(phone);
	      }

    })

  })

  app.delete('/family/phone/:identifier',function(request, response){
    // body...

    var delete_id = request.params.identifier
    console.log(delete_id)

    Phone.remove({_id :delete_id}, function(error, phone) {


	      if (error) {
	        response.send(error);
	      }else {
	        response.send("success")
          // response.send(phone);
	      }

    })

  })

  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
