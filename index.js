var express     = require('express');
var bodyParser  = require('body-parser');
var xmlparser   = require('express-xml-bodyparser');
var request     = require('request');
var url         = require('url');
var gzippo      = require('gzippo');
var nodemailer  = require('nodemailer');

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

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

app.get('/price.html', function (req, res) {
  res.render('price');
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
      console.log("ERROR!!!!");
      res.redirect('../order-error.html');
    })
});

app.post('/send-message', function (req, res) {
  sendEmail(res, req.body.email, req.body.message, "Enquiry from " + req.body.name,
    function() {
      res.redirect('../contact-success.html');
    }, 
    function(err) {
      console.log("ERROR!!!!");
      res.redirect('../contact-error.html');
    })
});

app.listen(process.env.PORT || 9000);
app.use(gzippo.staticGzip( __dirname + '/public'));

function sendEmail(res, email, message, subject, successCallback, errorCallback) {
  var smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "snapchatgeof@gmail.com",
      pass: "AsdfAsdf" 
    }
  });

  var mailOpts = {
    to: 'snapchatgeof@gmail.com',
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