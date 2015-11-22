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


app.get('/services', function(req, res) {
  var services = dataStore.getServices();
  res.send(services);
});

app.post('/services', function(req, res) {
  var body = req.body;
  console.log('received sendMsg with body:');
  console.log(body);
  var services = dataStore.addService(body.service);
  res.send('Service created.');
});

app.get('/tips', function(req, res) {
  var tips = dataStore.getTips();
  res.send(tips);
});

app.post('/tips', function(req, res) {
  var body = req.body;
  console.log('received tips with body:');
  console.log(body);
  var services = dataStore.addTip(body.key, body.msg, body.service);
  res.send('Tip created.');
});

app.get('/users', function(req, res) {
  var users = dataStore.getUsers();
  res.send(users);
});

app.post('/subscribe', function (req, res) {
  console.log(req.body);
  var body = req.body;
  dataStore.addUserToService(body.service,body.phoneNumber);
  res.send('User subscribed');
});

app.post('/sendMsg', function (req, res) {
  var body = req.body;
  console.log('sendMsg called with body:');
  console.log(body);
  var msg = body.msg;
  var timestamp = parseInt(body.timestamp) || Date.now();

  if(body.service){
    var users = dataStore.getUsersForService(body.service);
  }else{
    var users = dataStore.getUsers();
  }

  notificationDispatcher.sendNotificationToUsers(msg, users, timestamp)
  res.send('POST request to the sendMsg');
});

app.post('/sendMsgToUser', function (req, res) {
  var body = req.body;
  console.log('sendMsgToUser with body:');
  console.log(body);
  var msg = body.msg;
  var timestamp = parseInt(body.timestamp) || Date.now();
  var phoneNumber = body.phoneNumber;

  notificationDispatcher.sendNotificationToUser(msg, phoneNumber, timestamp)
  res.send('POST request to the sendMsgToUser');
});

app.post('/inboundsms', function (req, res) {
  var body = req.body;
  
  var text = getDefaultMessage();

  var value = body.Body.toLowerCase().trim() || "";
  console.log('inboundsms called with:' + value + ' and body:');
  console.log(body);

  if(dataStore.serviceExists(value)){
    dataStore.addUserToService(value, body.From);
    console.log('inboundsms registered : +' + body.From + ' for ' + value);
    text = 'Successfully registered to ' + value; 
  } else if(dataStore.tipExists(value)){
    var tips = dataStore.getTips();
    console.log('inboundsms tipRequest :' + body.From + ' tip: ' + tips[value]["msg"]);
    text = tips[value]["msg"];
    
  } else if( value === "tips"){
    text = getTipsMessage();
    console.log('inboundsms help :' + text);
  }

  res.header('Content-Type', 'text/xml');
  res.send(getFormattedTwillioResponse(text));
            
});

function getTipsMessage(){
  var formattedTips = {};
  var text = "";
  var tips = dataStore.getTips();
  _.each(tips, function(value, key){
    formattedTips[value.service] = formattedTips[value.service] || [];
    (formattedTips[value.service]).push(key);
  });

  _.each(formattedTips, function(value, key){
    text = text + key + '\n  ' +  value.join(',') + '\n';
  });

  return "Please respond with one of the tip choices:\n" + text;

}

function getDefaultMessage(){
  var services = dataStore.getServices();
  return "Please respond with one of the choices: " + _.initial(services).join(', ') + (_.size(services) > 1 ? '\n' : '') + _.last(services);
}

function getFormattedTwillioResponse(msg){
  return '<Response><Sms>' + msg + '</Sms></Response>';
}

///TESTING APIS
app.get('/health', function(req, res) {
  var users = dataStore.getUsersForService('health');
  res.send(users);
});


console.log('Server started');
app.listen(process.env.PORT || 9000);
app.use(gzippo.staticGzip( __dirname + '/public'));

