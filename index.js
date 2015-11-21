var express     = require('express');
var bodyParser  = require('body-parser');
var xmlparser   = require('express-xml-bodyparser');
var request     = require('request');
var url         = require('url');
var gzippo      = require('gzippo');
var _           = require('lodash-node');

var dataStore = require('./data-store');
var notificationDispatcher = require('./notification-dispatcher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(xmlparser());

app.get('/users', function(req, res) {
  var users = dataStore.getUsers();
  res.send(users);
});

app.post('/sendMsg', function (req, res) {
  console.log(req.body);

  var message = 'Hey';
  var users = dataStore.getUsers();
  var sendTimeStamp = Date.now();
  notificationDispatcher.sendNotificationToUsers(message, users, sendTimeStamp)
  res.send('POST request to the sendMsg');
});

app.post('/subscribe', function (req, res) {
  console.log(req.body);
  var body = req.body;
  dataStore.addUserToService(body.service,body.phoneNumber);
  res.send('User subscribed');
});

app.post('/inboundsms', function (req, res) {
  console.log('received twilio msg');
  res.header('Content-Type', 'text/xml');
  
  var body = req.body;
  console.log(body);

  var service = body.Body;
  if ( service && dataStore.serviceExists(service)){
    dataStore.addUserToService(service, body.From);
    res.send('<Response><Sms>Successfully registered to ' + service + '</Sms></Response>'); 
    
  }else{
    res.send('<Response><Sms>Please respond with ' + dataStore.getServices + '</Sms></Response>'); 
  }
            
});

///TESTING APIS
app.get('/health', function(req, res) {
  var users = dataStore.getUsersForService('health');
  res.send(users);
});


console.log('Server started');
app.listen(process.env.PORT || 9000);
app.use(gzippo.staticGzip( __dirname + '/public'));

