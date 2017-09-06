var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/superreplacer', function(req, res, next) {
  res.render('superreplace');
});
router.get('/duplicator', function(req, res, next) {
  res.render('duplicator');
});
router.get('/gridmaker', function(req, res, next) {
  res.render('gridmaker');
});

//Mailconfig
var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secureConnection: true, // use SSL 
    connectionTimeout: 120000,
    // greetingTimeout: 60000,
    auth: {
        user: 'energyeosdata@gmail.com',
        pass: 'KZLzWgTkNLQgLf'
    }

};
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"eosData"<energyeosdata@gmail.com>', // sender address 
    to: 'espenjohanpedersen@gmail.com', // list of receivers ,eosdata@enoco.no, eosdatatest@enoco.no
    subject: 'demo', // Subject line 
    text: '', // plaintext body 
    // attachments: [
    //     {   // file on disk as an attachment 
    //         filename: 'text3.txt',
    //         path: '/path/to/file.txt' // stream this file 
    //     },
    // ],
    html: '<b>Hello world ?</b>' // html body
};

var transporter = nodemailer.createTransport(poolConfig);// create reusable transporter object using the default SMTP transport 

module.exports = router;
