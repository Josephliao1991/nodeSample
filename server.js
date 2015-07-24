var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;
//
mongoose.connect('mongodb://'+argv.be_ip+':80/my_database');

  var Phone = mongoose.model('phone', {
      familyKey : String,
      deviceToken: String
  });

  var app = express();

  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended: true}))
  app.use(bodyparser.json({ type: 'application/vnd.api+json' }))
  app.use(methodOverride())

  app.get('/',function(request,response){
    response.end("Hello world, This is iNeDot Server!");
  });

  app.get('/family/phone',function(request, response){

    return Phone.findById(request.query.familyKey, function(error, phones) {

       if (error) {
         response.send(error)
       }else {
         response.json(phones)
       }

	  });

    // family.find(function(error, phone) {
    //   // body...
    //   if (error) {
    //       response.send(error);
    //   }
    //
    //   response.json(phone)
    //
    // })

  });

  app.post('/family/phone',function(request, response){

    Phone.create({
        familyKey : request.body.familyKey,
        deviceToken : request.body.deviceToken
    },function(error, phone){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.send("Success")
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

  app.put('/family/:id',function(request, response){
    // body...

    return family.findById(request.params.id, function(err, familyy) {
	    familyy.familyKey = request.body.familyKey;
	    familyy.deviceToken = request.body.deviceToken;
	    return familyy.save(function(err) {
	      if (err) {
	        response.send(err);
	      }
	      return response.send(familyy);
	    });
	  });

  })

  app.delete('/family/:id',function(request, response){
    // body...

    family.remove({
			_id : request.params.id
		}, function(err, familyy) {
			if (err)
				response.send(err);

			// get and return all the todos after you create another
			family.find(function(err, familys) {
				if (err)
					response.send(err)
				response.json(familys);
			});
		});

  })

  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
