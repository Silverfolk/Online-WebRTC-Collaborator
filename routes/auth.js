var express = require('express');
const { UserController } = require('../controller/userController');
var router = express.Router();
var passport=require('passport');
var mongoose=require('mongoose');
var userModel=require('../Models/user');
// var db=mongoose.connection;

router.route('/login')
.get(function(req,res){
  res.render('login',{title:'Login your Account'});
})
.post(passport.authenticate('local',{
    failureRedirect:'/login' //in case if login fails then we'll be redirected to the login  page 
}),function(req,res){
    res.redirect('/');//redirect to the homepage if login is successfull
});



router.route('/signup')
.get(function(req,res){
  res.render('signup',{title:'Register Your Account'});
})
.post(function(req,res){
  req.checkBody('name','Empty Name').notEmpty();
  req.checkBody('email','Invalid Email').isEmail();
  req.checkBody('password','Empty Password').notEmpty();
  req.checkBody('password','Password do not match').equals(req.body.confirmPassword).notEmpty();

  var errors=req.validationErrors();
  if(errors){
      res.render('signup',{
          
        name:req.body.name,
        email:req.body.email,
        errorMessages:errors
      });
  }
  else{
      var user=new userModel();
      user.name=req.body.name;
      user.email=req.body.email;
      user.setPassword(req.body.password);
      user.save(function(err){
          if(err){
              res.render('register',{errorMessages:err});
          }
          else{
              res.redirect('/login');
          }
      });
  }
});

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
})

module.exports=router;