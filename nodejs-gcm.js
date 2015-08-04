var http = require('http');

http.createServer(function (req,res) {
     res.writeHead(200,{'Content-Type': 'text/plain'});
    
     

/*
  var GCM = require('gcm').GCM;

  var apiKey = 'AIzaSyC7X3T-P-7dTs4QujGA3Gg8FxQpp4pBssg';
  var gcm = new GCM(apiKey);

  var message = {
      registration_id: 'APA91bF8LzoiMaeQ_rof9w2Hxo0k1VqSdUSSBYxsobSWvK8MvijJTL0JjppjOM0cdHkZkTMCFhLGQjru3ZACqsSgZHo7nBUjz_xyPT9UKixAVNOPMbdUxOnDX4tmi19EaoJQ_kgxz24qaA_aAAxoDGelp3rkCS79_g', // required
      collapse_key: 'aaaa', 
      time_to_live: 180,
      data: {
          message: "fuck" // your payload data
        }
  };
  
 

  gcm.send(message, function(err, messageId){
      if (err) {
          console.log("Something has gone wrong!");
      } else {
          console.log("Sent with message ID: ", messageId);
      }
  });
     
*/
  

  
  
  
  var GCM = require('./gcmnew');
  
  var gcm = new GCM('AIzaSyDzwLzOgygmGQHHprbcc9mCi9Pw-r2YqeU'); // https://code.google.com/apis/console
   
  // create the message
  var msg = {
    registration_ids: ['APA91bFCM27i2PgGX0n4iZWZbK5UhrIGY9VcjIuf7hy8fFSGvlpUqgM2Psr8SqJkkFtDE2hx4bWa50lFNTlHw5k3XcKBu7GYbxViM3G6r3NYX5FTq_7bkv13QZOdknjAPLZSRQqvdxltTMuwtVJ8tSuVl8EtfPnvOw'],
    collapse_key: "0002dsaa", // http://developer.android.com/guide/google/gcm/gcm.html#send-msg
    time_to_live: 180, // just 30 minutes
    data: {
      SubTitle: "Hello",
      Message: "fuck you gcm!" // your payload data
    }
  };
   
  // send the message and see what happened
  gcm.send(msg, function(err, response) {
    // that error is from the http request, not gcm callback
    console.log(response); // http://developer.android.com/guide/google/gcm/gcm.html#response
  });
  
  
     
     
     res.end('Hello World');



     
     
     
     

}).listen(8124,"192.168.1.167");
console.log('Server is running at http://192.168.1.167:8124/');
