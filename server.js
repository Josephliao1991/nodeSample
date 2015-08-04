var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;
var phone = require('./phone.js');
var inedot = require('./inedot.js');
var center = require('./center.js');
var cpush = require('./c-push.js');
  //Connect to Mongodb
  mongoose.connect('mongodb://'+argv.be_ip+':80/my_database');

  //set express to app
  var app = express();
  app.use(bodyparser.json())
  app.use(bodyparser.urlencoded({extended: false}))
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

  // //Create Push Mongodb Module
  // /* Command Rule
  // command : Number
  // Baby  = 0
  // Area  = 1
  // Alert = 2
  // Temp  = 3
  // Break Connection  = 4
  // */
  // var CPush = mongoose.model('c_push', {
  //     familyKey     : String,
  //     c_macAddr     : String,
  //     i_macAddr     : String,
  //     command       : Number,
  //     checkMark     : Boolean
  // });

  //implement /family/inedot/ API
  app.get('/family/c_push/all',function(request, response){

    var req = request
    var res =response
    cpush.allCPush(req, res)
      // CPush.find(function(error, c_pushs) {
      //   // body...
      //   if (error) {
      //     response.send(error)
      //   }else {
      //     response.json(c_pushs)
      //   }
      // })
  });

  app.get('/family/c_push',function(request, response){

    var req = request
    var res = response
    cpush.familyCPush(req, res)
    // var familyKey_find = request.query.familyKey
    // var c_macAddr_find = request.query.c_macAddr
    // console.log('c_push Query With familyKey: '+ familyKey_find);
    // console.log('c_push Query With c_macAddr: '+ c_macAddr_find);
    //
    // if (c_macAddr_find) {
    //
    //   CPush.find({familyKey : familyKey_find,
    //               c_macAddr : c_macAddr_find,
    //               checkMark : false},
    //
    //     function(error, c_push) {
    //       // body...
    //       if (error) {
    //         response.send(error)
    //       }else {
    //         response.json(c_push)
    //       }
    //     })
    // }
  });

  app.post('/family/c_push/create',function(request, response){

    CPush.create({

        familyKey     : request.body.familyKey,
        c_macAddr     : request.body.c_macAddr,
        i_macAddr     : request.body.i_macAddr,
        command       : request.body.command,
        checkMark     : false

    },function(error, c_push){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.send("success")
      }
    })
  });

  // app.post('/family/c_push/update',function(request, response){
  //   // body...
  //   var familyKey_find  = request.body.familyKey
  //   var c_macAddr_find  = request.body.c_macAddr
  //   var i_macAddr_find  = request.body.i_macAddr
  //
  //   console.log(familyKey_find);
  //   console.log(c_macAddr_find);
  //   console.log(i_macAddr_find);
  //
  //   CPush.findOne({familyKey : familyKey_find,
  //                  c_macAddr : c_macAddr_find,
  //                  i_macAddr : i_macAddr_find,
  //                  checkMark : false},
  //
  //   function(error, c_push) {
  //       // body...
  //       if (error) {
  //         response.end(error)
  //       }
  //       if (c_push) {
  //         // if (request.body.familyKey) {
  //         //     push.familyKey       = request.body.familyKey;
  //         //   }
  //         // if (request.body.c_macAddr) {
  //         //     push.c_macAddr       = request.body.c_macAddr;
  //         //   }
  //
  //         c_push.checkMark = true
  //
  //         // response.send(center)
  //         return c_push.save(function(error) {
  //           if (error) {
  //             response.send(error);
  //           }else {
  //             response.send("success")              // return response.send(phone);
  //           }
  //         });
  //       }
  //     })
  //   });

  app.post('/family/c_push/update',function(request, response){
    // body...
    // var familyKey_find  = request.body.familyKey
    // var c_macAddr_find  = request.body.c_macAddr
    // var i_macAddr_find  = request.body.i_macAddr
    var identifier_find = request.body.identifier;

    // console.log(familyKey_find);
    // console.log(c_macAddr_find);
    // console.log(i_macAddr_find);
    console.log(identifier_find);

    CPush.findById({_id : identifier_find},

    function(error, c_push) {
        // body...
        if (error) {
          response.end(error)
        }
        if (c_push) {
          // if (request.body.familyKey) {
          //     push.familyKey       = request.body.familyKey;
          //   }
          // if (request.body.c_macAddr) {
          //     push.c_macAddr       = request.body.c_macAddr;
          //   }

          c_push.checkMark = true

          // response.send(center)
          return c_push.save(function(error) {
            if (error) {
              response.send(error);
            }else {
              response.send("success")              // return response.send(phone);
            }
          });
        }
      })
    });


    app.post('/family/c_push/delete',function(request, response){
      // body...
      var familyKey_find  = request.body.familyKey
      var c_macAddr_find  = request.body.c_macAddr
      var i_macAddr_find  = request.body.i_macAddr

      console.log(familyKey_find);
      console.log(c_macAddr_find);
      console.log(i_macAddr_find);

      CPush.findOne({familyKey : familyKey_find,
                     c_macAddr : c_macAddr_find,
                     i_macAddr : i_macAddr_find},

      function(error, c_push) {
          // body...
          if (error) {
            response.end(error)
          }

          if (c_push) {
              // response.send(center)
              c_push.remove(function (error) {
                // body...
                if (error) {
                  response.send(error)
                }else {
                  response.send("success")
                }
              })
          }
        })
    })


    //HOME ALERT API
    app.post('/monitor', function(request, response) {
      // body...
      var familyKey_alert = request.body.familyKey
      var macAddr_alert   = request.body.macAddr

      iNeDot.findOne({familyKey : familyKey_alert,
                      macAddr   : macAddr_alert},
      function(error,inedot) {
          // body...
          if (error) {
            response.send(error)
          }
          if (inedot) {
            var situation = inedot.situation
            response.send("success")


          }else {
            response.send("fail")
          }

        })


    })

  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
