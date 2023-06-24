import express from "express";
import passport from "passport";
import Mailer from "../utils/nodemailer";
const router = express.Router();
import User from "../modal/modal";
import authenticate from "../middleware/authentication";
import passportStragetiesConfig from "../config/config"
import * as controller from "../controller/auth"
//import upload from "../utils/multer";
passportStragetiesConfig(passport)
//strategies config
//GoogleStrategy
/*passport.use(new GoogleStrategy({
    clientID: "161165475594-olso0o49a0dibh391f2aha8cf47dk7nf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:2000/auth/google/callback"
  },
async (accessToken:any, refreshToken:any, profile:any, cb:any) =>{
  try{
      const user = await User.create({
        email:profile.emails[0].value,
      password:"passwordhhh",
       bio:"",
      name: profile.displayName,
      profileUrl: profile.photos[0].value,
    })
    console.log(user)
  cb(null, user)
  }catch(erro){
    console.log(erro)
  }
}



))*/
///GitHub 
router.get('/auth/github',passport.authenticate('github'))
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: 'http://localhost:2000/NotFound'}),
(req:any, res:any) => {
   res.redirect(`http://localhost:2000/success?email=${req.user.email}`);
  })
  
    //twitter 
   router.get('/auth/twitter',
  passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: 'http://localhost:2000/NotFound'}),
(req:any, res:any) => {
 // console.log(req.user)
    res.redirect(`http://localhost:2000/success?email=${req.user.email}`);
  });
//google
router.route("/auth/google").get(
  passport.authenticate('google', { scope:
      ['email', 'profile' ] }
));
router.route("/auth/google/callback").get(
	passport.authenticate("google", {
		failureRedirect: 'http://localhost:2000/NotFound'}),
(req:any, res:any) => {
    res.redirect(`http://localhost:2000/check`);
  });
//Facebook 
router.get('/auth/facebook',
  passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', 
  {
    failureRedirect: 'http://localhost:2000/NotFound'}),
(req:any, res:any) => {
 // console.log(req.user)
    res.redirect(`http://localhost:2000/success?email=${req.user.email}`);
  })
  
  passport.serializeUser(function(user:any, cb:any) {
  process.nextTick(function() {
   /* return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    })*/
    return cb(null,user)
  });
});
passport.deserializeUser(function(user:any, cb:any) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
//strategies 
router.route("/check").get((req:any,res:any)=>{
res.send({message:"successfully"});
});
router.route("/success").get((req:any,res:any)=>{
res.send({message:"successfully"});
});
router.route("/register").post(controller.signUp);
router.route("/login").post(controller.login);
router.route("/edit").post(authenticate, controller.updateUser);
router.route("/setpassword").post(controller.setpassword);
router.route("/user").get(authenticate, controller.getAuthenticatedUser)
router.route("/:id").get(controller.verifyAccount);
router.route("/NotFound").post((req:any,res:any)=>{
  res.send("no user found")
});


export default router;