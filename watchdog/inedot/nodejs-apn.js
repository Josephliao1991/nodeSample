
var apns = require('apn');

function sendiOSPush(deviceToken, badgeNumber, situation, name, macAddr) {
  // body...
  var options = {
      cert: 'aps_development.pem',                 /* Certificate file path */
      key:  'apns_dev_key.pem',                  /* Key file path */
      gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
      passphrase : '0000',
      port: 2195,                       /* gateway port */
      errorCallback: errorHappened ,    /* Callback when error occurs function(err,notification) */
  };
  function errorHappened(err, notification){
      console.log("err " + err);
  }
  var apnsConnection = new apns.Connection(options);


  var token = deviceToken
  if (token.length < 20) {
    token = "23985a90d260d1d6a2cb5670714d1f79025a1c44f7f8aab3f991e4a67f08e353";
  }



  var myDevice = new apns.Device(token);
  var note = new apns.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = badgeNumber;
  note.sound = "ping.aiff";
  note.alert = "Emergency From "+name
  note.payload = {"messageFrom": "iNedotServer",
                  "situation"  : situation,
                  "name"       : name,
                  "macAddr"    : macAddr};

  note.device = myDevice;

  apnsConnection.sendNotification(note);
}

function sendiOSTroublePush(deviceToken, message) {
  // body...
  var options = {
      cert: 'aps_development.pem',                 /* Certificate file path */
      key:  'apns_dev_key.pem',                  /* Key file path */
      gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
      passphrase : '0000',
      port: 2195,                       /* gateway port */
      errorCallback: errorHappened ,    /* Callback when error occurs function(err,notification) */
  };
  function errorHappened(err, notification){
      console.log("err " + err);
  }
  var apnsConnection = new apns.Connection(options);
  var token = deviceToken
  if (token.length < 20) {
    token = "23985a90d260d1d6a2cb5670714d1f79025a1c44f7f8aab3f991e4a67f08e353";
  }

  var myDevice = new apns.Device(token);
  var note = new apns.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  // note.badge = 88888;
  // note.sound = "ping.aiff";
  // note.alert = "Push Trouble Test"
  note.payload = message;

  note.device = myDevice;

  apnsConnection.sendNotification(note);

}


/*==============================Testing================================*/

function sendUploadAlertiOSPush(message) {
  // body...
  var options = {
      cert: 'aps_development.pem',                 /* Certificate file path */
      key:  'apns_dev_key.pem',                  /* Key file path */
      gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
      passphrase : '0000',
      port: 2195,                       /* gateway port */
      errorCallback: errorHappened ,    /* Callback when error occurs function(err,notification) */
  };
  function errorHappened(err, notification){
      console.log("err " + err);
  }
  var apnsConnection = new apns.Connection(options);

  var myDevice = new apns.Device("e5e717c79e4bb9a1e97b820aa5a693d3e657c1a12bf2d67102911078b3735540");
  var note = new apns.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 9999999;
  note.sound = "ping.aiff";
  note.alert = "UploadAlert "+message
  note.payload = {"messageFrom": "iNedotServer"};

  note.device = myDevice;

  apnsConnection.sendNotification(note);
}

module.exports = {

  sendiOSPush    : sendiOSPush,
  sendiOSTroublePush    : sendiOSTroublePush,
  sendUploadAlertiOSPush  : sendUploadAlertiOSPush

}
