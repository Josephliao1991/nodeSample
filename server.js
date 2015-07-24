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

    var familyKey_find = request.query.familyKey
    console.log(familyKey_find);

    if (familyKey_find == null) {

      Phone.find(function(error, phones) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(phones)
        }

      })

    }else {

      Phone.find({familyKey:familyKey_find},function(error, phones) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(phones)
        }

      })

    }


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

    return Phone.findById(request.body.id, function(error, phone) {

      if (error) {
        response.end(error)
      }
      
	    phone.familyKey = request.body.familyKey;
	    phone.deviceToken = request.body.deviceToken;

	    return phone.save(function(error) {
	      if (error) {
	        response.send(error);
	      }else {
	        response.send("success")
          // return response.send(phone);
	      }

	    });
	  });

  })

  app.delete('/family/phone',function(request, response){
    // body...

    var delete_id = request.body.id
    console.log(delete_id)

    Phone.remove({_id : ObjectID(delete_id)}, function(err, phone) {

      // phone.save(function(error) {
	    //   if (error) {
	    //     response.send(error);
	    //   }else {
	    //     response.send("success")
      //     // return response.send(phone);
	    //   }
      //
	    // });

      // if (err){
			// 	response.send(err);
      // }else {
      //   response.send("success")
      // }

			// get and return all the todos after you create another
			Phone.find(function(err, phones) {
				if (err){
					response.send(err)
        }else {
          response.json(phones);
        }
			});

		});

  })

  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
