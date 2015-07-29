var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var argv = require('optimist').argv;

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

  //Create Phone Mongodb Module
  var Phone = mongoose.model('phone', {
      familyKey   : String,
      deviceToken : String,
      operation   : String
  });

  //implement /family/phone/ API
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

  app.post('/family/phone/create',function(request, response){

    Phone.create({
        familyKey   : request.body.familyKey,
        deviceToken : request.body.deviceToken,
        operation   : request.body.operation
    },function(error, phone){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.send("success")
      }
    })
  });

  app.post('/family/phone/update',function(request, response){
    // body...
    var familyKey_find = request.body.familyKey
    var deviceToken_find   = request.body.deviceToken

    console.log(familyKey_find);
    console.log(deviceToken_find);

    Phone.findOne({familyKey     : familyKey_find,
                   deviceToken   : deviceToken_find },
    function(error, phone) {
      if (error) {
        response.end(error)
      }else {
        if (phone) {

          // if (request.body.familyKey) {
          //     phone.familyKey    = request.body.familyKey;
          // }
          //
          // if (request.body.deviceToken) {
          //     phone.deviceToken  = request.body.deviceToken;
          // }
          if (request.body.operation) {
              phone.operation    = request.body.operation;
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

  app.post('/family/phone/delete',function(request, response){
    // body...
    var familyKey_find    = request.body.familyKey
    var deviceToken_find  = request.body.deviceToken

    console.log(familyKey_find);
    console.log(deviceToken_find);

    Phone.findOne({familyKey     : familyKey_find,
                   deviceToken   : deviceToken_find },

    function(error, phone) {

        // body...
        if (error) {
          response.end(error)
        }
        if (phone) {
            // response.send(center)
            phone.remove(function (error) {
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

  // app.delete('/family/phone/:identifier',function(request, response){
  //   // body...
  //
  //   var delete_id = request.params.identifier
  //   console.log(delete_id)
  //
  //   Phone.remove({_id :delete_id}, function(error, phone) {
  //
  //
	//       if (error) {
	//         response.send(error);
	//       }else {
	//         response.send("success")
  //         // response.send(phone);
	//       }
  //
  //   })
  //
  // })

  //Create iNeDot Mongodb Module
  var iNeDot = mongoose.model('inedot', {
      familyKey     : String,
      macAddr       : String,

      name          : String,
      situation     : String,

      owner         : String,
      connectState  : Boolean,

      battery       : Number,

      preset        : Array
  });

  //implement /family/inedot/ API
  app.get('/family/inedot/all',function(request, response){

      iNeDot.find(function(error, inedots) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(inedots)
        }
      })
  });

  app.get('/family/inedot',function(request, response){

    var familyKey_find = request.query.familyKey
    var macAddr_find   = request.query.macAddr
    console.log('iNeDots Query With familyKey: '+ familyKey_find);
    console.log('iNeDots Query With macAddr: '+ macAddr_find);

    if (macAddr_find) {

      iNeDot.find({familyKey : familyKey_find,
                  macAddr   : macAddr_find},

        function(error, inedots) {
          // body...
          if (error) {
            response.send(error)
          }else {
            response.json(inedots)
          }
        })
    }else {
      iNeDot.find({familyKey : familyKey_find},
        function(error, inedots) {
          // body...
          if (error) {
            response.send(error)
          }else {
            response.json(inedots)
          }
        })
      }
  });

  app.post('/family/inedot/create',function(request, response){

    var presetValue;
    if (request.body.situation == "temp" && request.body.temp) {
        presetValue = [{temp : request.body.temp}]
    }else if (request.body.situation == "alert" && request.body.alert) {
        presetValue = [{alert : request.body.alert}]
    }else if (request.body.situation == "message" && request.body.message) {
        presetValue = [{message : request.body.message}]
    }

    iNeDot.create({

        familyKey     : request.body.familyKey,
        macAddr       : request.body.macAddr,

        owner         : request.body.owner,
        connectState  : request.body.connectState,

        name          : request.body.name,
        situation     : request.body.situation,

        battery       : request.body.battery,

        preset        : presetValue
    },function(error, inedot){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.send("success")
      }
    })
  });

  app.post('/family/inedot/update',function(request, response){
    // body...
    var familyKey_find = request.body.familyKey
    var macAddr_find   = request.body.macAddr

    console.log(familyKey_find);
    console.log(macAddr_find);

    iNeDot.findOne({familyKey : familyKey_find,
                  macAddr  : macAddr_find },function(error, inedot) {
    // return iNeDot.findById(identifier,function(error, inedot) {
        // body...
        if (error) {
          response.end(error)
        }

        if (inedot) {
          // if (request.body.familyKey) {
          //     inedot.familyKey       = request.body.familyKey;
          //   }
          // if (request.body.macAddr) {
          //     inedot.macAddr         = request.body.macAddr;
          //   }
          if (request.body.situation) {
              inedot.situation       = request.body.situation;
            }
          if (request.body.connectState) {
              inedot.connectState    = request.body.connectState;
            }
          if (request.body.name) {
              inedot.name            = request.body.name;
            }
          if (request.body.battery) {
              inedot.battery         = request.body.battery;
            }
          if (request.body.owner) {
              inedot.owner           = request.body.owner;
            }
          if (request.body.situation == "temp" && request.body.temp) {
              inedot.preset     = [{temp : request.body.temp}];
          }else if (request.body.situation == "alert" && request.body.alert) {
              inedot.preset     = [{alert : request.body.alert}];
          }else if (request.body.situation == "message" && request.body.message) {
              inedot.preset     = [{message : request.body.message}];
          }

          // response.send(inedot)
          return inedot.save(function(error) {
            if (error) {
              response.send(error);
            }else {
              response.send("success")              // return response.send(phone);
            }
          });
        }
      })
    });

  app.post('/family/inedot/delete',function(request, response){
    // body...

    var familyKey_find = request.body.familyKey
    var macAddr_find   = request.body.macAddr

    console.log(familyKey_find);
    console.log(macAddr_find);

    iNeDot.findOne({familyKey : familyKey_find,
                    macAddr  : macAddr_find },

    function(error, inedot) {

        // body...
        if (error) {
          response.end(error)
        }
        if (inedot) {
            // response.send(center)
            inedot.remove(function (error) {
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

  // app.delete('/family/inedot/:identifier',function(request, response){
  //   // body...
  //
  //   var delete_id = request.params.identifier
  //   console.log(delete_id)
  //
  //   iNeDot.remove({_id :delete_id}, function(error, phone) {
  //
  //       if (error) {
  //         response.send(error);
  //       }else {
  //         response.send("success")
  //         // response.send(phone);
  //       }
  //
  //   })
  //
  // })


  //Create Center Mongodb Module
  var Center = mongoose.model('center', {
      familyKey     : String,
      macAddr       : String,

      connectState  : Boolean,
  });

  //implement /family/inedot/ API
  app.get('/family/center/all',function(request, response){

      Center.find(function(error, centers) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(centers)
        }
      })
  });

  app.get('/family/center',function(request, response){

    var familyKey_find = request.query.familyKey
    var macAddr_find   = request.query.macAddr
    console.log('Center Query With familyKey: '+ familyKey_find);
    console.log('Center Query With macAddr: '+ macAddr_find);

    if (macAddr_find) {

      Center.find({familyKey : familyKey_find,
                  macAddr   : macAddr_find},

        function(error, center) {
          // body...
          if (error) {
            response.send(error)
          }else {
            response.json(center)
          }
        })
    }else {

      Center.find({familyKey : familyKey_find},
        function(error, centers) {
          // body...
          if (error) {
            response.send(error)
          }else {
            response.json(centers)
          }
        })
      }
  });

  app.post('/family/center/create',function(request, response){

    Center.create({

        familyKey     : request.body.familyKey,
        macAddr       : request.body.macAddr,

        connectState  : request.body.connectState,

    },function(error, center){
      // body...
      if (error) {
          response.send(error)
      }else {
          // response.json(phone)
          response.send("success")
      }
    })
  });

  app.post('/family/center/update',function(request, response){
    // body...
    var familyKey_find = request.body.familyKey
    var macAddr_find   = request.body.macAddr

    console.log(familyKey_find);
    console.log(macAddr_find);

    Center.findOne({familyKey : familyKey_find,
                    macAddr  : macAddr_find },

    function(error, center) {
        // body...
        if (error) {
          response.end(error)
        }
        if (center) {
          // if (request.body.familyKey) {
          //     center.familyKey       = request.body.familyKey;
          //   }
          // if (request.body.macAddr) {
          //     center.macAddr         = request.body.macAddr;
          //   }

          if (request.body.connectState) {
              center.connectState    = request.body.connectState;
            }
          // response.send(center)
          return center.save(function(error) {
            if (error) {
              response.send(error);
            }else {
              response.send("success")              // return response.send(phone);
            }
          });
        }
      })
    });

  app.post('/family/center/delete',function(request, response){
    // body...
    var familyKey_find = request.body.familyKey
    var macAddr_find   = request.body.macAddr

    console.log(familyKey_find);
    console.log(macAddr_find);

    Center.findOne({familyKey : familyKey_find,
                    macAddr   : macAddr_find },

    function(error, center) {
        // body...
        if (error) {
          response.end(error)
        }

        if (center) {
            // response.send(center)
            center.remove(function (error) {
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

  // app.delete('/family/center/:identifier',function(request, response){
  //   // body...
  //
  //   var delete_id = request.params.identifier
  //   console.log(delete_id)
  //
  //
  //
  //   Center.remove({_id :delete_id}, function(error, phone) {
  //
  //       if (error) {
  //         response.send(error);
  //       }else {
  //         response.send("success")
  //         // response.send(phone);
  //       }
  //
  //   })
  //
  // })

  //Create Push Mongodb Module
  /* Command Rule
  command : Number
  Baby  = 0
  Area  = 1
  Alert = 2
  Temp  = 3
  Break Connection  = 4
  */
  var CPush = mongoose.model('c_push', {
      familyKey     : String,
      c_macAddr     : String,
      i_macAddr     : String,
      command       : Number,
      preset        : Array,
      checkMark     : Boolean
  });

  //implement /family/inedot/ API
  app.get('/family/c_push/all',function(request, response){

      CPush.find(function(error, c_pushs) {
        // body...
        if (error) {
          response.send(error)
        }else {
          response.json(c_pushs)
        }
      })
  });

  app.get('/family/c_push',function(request, response){

    var familyKey_find = request.query.familyKey
    var c_macAddr_find = request.query.c_macAddr
    console.log('c_push Query With familyKey: '+ familyKey_find);
    console.log('c_push Query With c_macAddr: '+ c_macAddr_find);

    if (c_macAddr_find) {

      CPush.find({familyKey : familyKey_find,
                  c_macAddr : c_macAddr_find,
                  checkMark : false},

        function(error, c_push) {
          // body...
          if (error) {
            response.send(error)
          }else {
            response.json(c_push)
          }
        })
    }
  });

  app.post('/family/c_push/create',function(request, response){


    var familyKey_find = request.query.familyKey
    var c_macAddr_find = request.query.c_macAddr
    var i_macAddr_find = request.query.i_macAddr

    if (request.body.command == 3 || request.body.command == 2) {
      iNeDot.find({familyKey : familyKey_find,
                      macAddr   : i_macAddr_find},

        function(error, inedot) {
          // body...
          if (error) {
            response.send(error)
          }else {
            response.json(inedot)
            CPush.create({
              // var presetValue = inedot.preset

                familyKey     : request.body.familyKey,
                c_macAddr     : request.body.c_macAddr,
                i_macAddr     : request.body.i_macAddr,
                command       : request.body.command,
                preset        : inedot.preset,
                checkMark     : false

            },function(error, c_push){
              // body...
              if (error) {
                  response.send(error)
              }else {
                  response.json(c_push)
                  response.send("success")
              }
            })

          }
        })
    }

  });

  app.post('/family/c_push/update',function(request, response){
    // body...
    var familyKey_find  = request.body.familyKey
    var c_macAddr_find  = request.body.c_macAddr
    var i_macAddr_find  = request.body.i_macAddr

    console.log(familyKey_find);
    console.log(c_macAddr_find);
    console.log(i_macAddr_find);

    CPush.findOne({familyKey : familyKey_find,
                   c_macAddr : c_macAddr_find,
                   i_macAddr : i_macAddr_find,
                   checkMark : false},

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

  app.listen(8080,argv.fe_ip,function(request, response) {
    // body...
    // console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    console.log("Press Ctrl+C to quit.");
    console.log("server start");

  })
