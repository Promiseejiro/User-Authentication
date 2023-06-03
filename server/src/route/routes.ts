import express from "express";
import passport from "passport";
const router = express.Router();
//import upload from "../utils/multer";
// * as controller from "../controller/auth";
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//strategies config

//GoogleStrategy
passport.use(new GoogleStrategy({
    clientID: "161165475594-olso0o49a0dibh391f2aha8cf47dk7nf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:2000/auth/google/callback"
  },
  function(accessToken:any, refreshToken:any, profile:any, done:any) {
    console.log(profile)
  }
));


//GitHubStrategy
passport.use(new GitHubStrategy({
    clientID: "da57dd355874c6f4790b",
    clientSecret: "c049e291855f3f7ebce2b04c8b612437d3730096",
    callbackURL: "http://localhost:2000/auth/github/callback"
  },
  function(accessToken:any, refreshToken:any, profile:any, done:any) {
    console.log(profile)
  }
));



passport.use(new TwitterStrategy({
    consumerKey: "u6HMvVjImWdPDihxsC3tgoDBw",
    consumerSecret: "Y0vQXohP3GqB22e8F2eoRNKMatDlf08JxcVmv5Ot9gh3lXFZZz",
    callbackURL: "http:localhost:2000/auth/twitter/callback"
  },
  function(accessToken:any, refreshToken:any, profile:any, done:any) {
    console.log(profile)
  }
));
passport.use(new FacebookStrategy({
    clientID: "640549644612277",
    clientSecret: "eaa49820ff8ff4918c4d55e49a14de91",
    callbackURL: "http://localhost:2000/auth/facebook/callback",
 //   passReqToCallback : true,
      // profileFields: ['emails']
  },
    function(accessToken:any, refreshToken:any, profile:any, done:any) {
   console.log(profile);
   console.log("successful")
  }
));

//strategies
//require("../controller/google");

///GitHub 
router.route('/auth/github').get(passport.authenticate('github'));
router.route('/auth/github/callback').get(
    passport.authenticate('github', { failureRedirect: '/NotFound',
       successRedirect: '/success',
    }));
    
    
    //twitter 
   router.route('/auth/twitter').get(
  passport.authenticate('twitter'));

router.route('/auth/twitter/callback').get( 
  passport.authenticate('twitter', { failureRedirect: '/NotFound',
    successRedirect: '/success', })
  );

//google
router.route("/auth/google").get(
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
router.route("/auth/google/callback").get( 
    passport.authenticate( 'google', {
        failureRedirect: '/NotFound',
        successRedirect: '/success',
}));

//Facebook 
router.route('/auth/facebook').get(
  passport.authenticate('facebook'));

router.route('/auth/facebook/callback').get(
  passport.authenticate('facebook', 
  {
    failureRedirect: '/NotFound',
    successRedirect: '/success',
  }
  ))

//GitHub end 
//strategies 
/*
router.route("/register").post(controller.register)
router.route("/login").post(controller.login);
router.route("/verify").post(controller.emailVerification);
*/
router.route("/NotFound").post((req:any,res:any)=>{
  res.send("no user found")
})

router.route("/success").get((req:any,res:any)=>{
  res.send("successful login");
});


export default router;
