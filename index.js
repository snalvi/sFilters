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
  var smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "snapchatgeof@gmail.com",
      pass: "AsdfAsdf" 
    }
  });

  var mailOpts = {
    from: 'Order Completion',
    to: 'snapchatgeof@gmail.com',
    subject: 'Order from ' + req.body.name,
    replyTo: req.body.email,
    text: req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log("ERROR!!!!");
      res.redirect('../order-error.html');
    } else {
      res.redirect('../order-complete.html');
    }
  });
});

app.listen(process.env.PORT || 9000);
app.use(gzippo.staticGzip( __dirname + '/public'));