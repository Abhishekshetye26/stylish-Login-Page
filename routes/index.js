var express = require('express');
const passport = require('passport');
var router = express.Router();
var userModel = require('./users.js');

const localStatergy = require("passport-local");
const app = require('../app.js');

passport.use(new localStatergy(userModel.authenticate()));



/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/membor', function(req, res, next) {
  res.render('membor', { title: 'Express' });
});


router.get('/profile' ,isLoggedIn, function(req , res){

   res.send("welcome to profile");
})

router.post('/register' , function(req , res){

   var userdata = new userModel({
     username : req.body.username,
     secret :req.body.secret,
   })

   userModel.register(userdata , req.body.password)
   .then(function(registereduser){
      passport.authenticate("local")(req ,res,function(){
        
        res.redirect("/profile");
      })
   })
})

router.post("/login" , passport.authenticate("local" ,{
  successRedirect : "/profile" ,
  failureRedirect : "/membor"

}) , function(req ,res) { })

router.get('/logout' , function (req , res , next){

   req.logout(function(err){
      if(err){
        return next(err);}

        res.redirect('/');
   });
});

function isLoggedIn(req , res , next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/');
}

module.exports = router;
