var express     = require('express');
var bodyParser  = require('body-parser');
var request     = require('request');
var url         = require('url');
var gzippo      = require('gzippo');
var _           = require('lodash-node');

var dataStore = require('./data-store');
var notificationDispatcher = require('./notification-dispatcher');

var app = express();
app.use(bodyParser.json()); // for parsing application/json


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

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
  dataStore.addUserToService(body.service,body.name);
  res.send('User subscribed');
});

///TESTING APIS
app.get('/health', function(req, res) {
  var users = dataStore.getUsersForService('health');
  res.send(users);
});



app.listen(process.env.PORT || 9000);
app.use(gzippo.staticGzip( __dirname + '/app'));