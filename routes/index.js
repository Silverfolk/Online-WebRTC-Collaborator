var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var config=require('../config');
var {Register}=require('../controller/userController');
const  userModel=require('../Models/user')

var transporter=nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
      auth:{
          user:'coderjava67@gmail.com',
          pass:'ukbebszoiiutgfcf'
      }
});//mailer is method that we create inside config which we are reqiring as an object from config.js file

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SilverFolk- A Platform for sharing code ' });
});

// to go on about Section 
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'SilverFolk- A Platform for sharing code ' });
});

// to go on contact-us  Section 
router.route('/contact')
.get(function(req, res, next) {
  res.render('contact', { title: 'SilverFolk- A Platform for sharing code ' });
})
.post(function(req, res, next){
  req.checkBody('name','Empty name').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('message','Empty message').notEmpty();
  var errors=req.validationErrors();

  if(errors){
    res.render('contact',{
      title:'SilverFolk- A Platform for sharing code ',
      name:req.body.name,
      email:req.body.email,
      message:req.body.message,
      errorMessages:errors
    });
  }
  else{
    var mailOptions={
      from:'Silverfolk <no-reply@coderjava51.com>',
      to:'coderjava67@gmail.com',
      subject:'You got a new Message from visitor',
      text:req.body.message
    };

   transporter.sendMail(mailOptions,function(error,info){
      if(error){
        res.json(error);
      }
      else{

      res.render('thanks', { title: 'SilverFolk- A Platform for sharing code '});
      console.log(JSON.stringify(result, null, 4));
      }
    });
    
  }
});
// as we will also send the information so we will also required to make a post request 

module.exports = router;
