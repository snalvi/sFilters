var express     = require('express');
var bodyParser  = require('body-parser');
var xmlparser   = require('express-xml-bodyparser');
var request     = require('request');
var url         = require('url');
var path        = require('path');
var compression = require('compression');
var nodemailer  = require('nodemailer');

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(compression()); //use compression 
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(xmlparser());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/faq.html', function (req, res) {
  res.render('faq');
});

app.get('/contact.html', function (req, res) {
  res.render('contact');
});

app.get('/contact-error.html', function (req, res) {
  res.render('contact-error');
});

app.get('/contact-success.html', function (req, res) {
  res.render('contact-success');
});

app.get('/order.html', function (req, res) {
  res.render('order');
});

app.get('/order-complete.html', function (req, res) {
  res.render('order-complete');
});

app.get('/order-error.html', function (req, res) {
  res.render('order-error');
});

app.post('/order-submit', function (req, res) {
  sendEmail(res, req.body.email, req.body.message, "Order from " + req.body.name,
    function() {
      res.redirect('../order-complete.html');
    }, 
    function(err) {
      console.log("ERROR!!!! " + err);
      res.redirect('../order-error.html');
    })
});

app.post('/send-message', function (req, res) {
  sendEmail(res, req.body.email, req.body.message, "Enquiry from " + req.body.name,
    function() {
      res.redirect('../contact-success.html');
    }, 
    function(err) {
      console.log("ERROR!!!! " + err);
      res.redirect('../contact-error.html');
    })
});

app.listen(process.env.PORT || 9000);

function sendEmail(res, email, message, subject, successCallback, errorCallback) {
  var smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.emailPassword
    }
  });

  var mailOpts = {
    to: process.env.email,
    subject: subject,
    replyTo: email,
    text: message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      errorCallback(error);
    } else {
      successCallback();
    }
  });
}