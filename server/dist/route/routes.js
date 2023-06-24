"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const authentication_1 = __importDefault(require("../middleware/authentication"));
const config_1 = __importDefault(require("../config/config"));
const controller = __importStar(require("../controller/auth"));
//import upload from "../utils/multer";
(0, config_1.default)(passport_1.default);
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
router.get('/auth/github', passport_1.default.authenticate('github'));
router.get('/auth/github/callback', passport_1.default.authenticate('github', { failureRedirect: 'http://localhost:2000/NotFound' }), (req, res) => {
    res.redirect(`http://localhost:2000/success?email=${req.user.email}`);
});
//twitter 
router.get('/auth/twitter', passport_1.default.authenticate('twitter'));
router.get('/auth/twitter/callback', passport_1.default.authenticate('twitter', { failureRedirect: 'http://localhost:2000/NotFound' }), (req, res) => {
    // console.log(req.user)
    res.redirect(`http://localhost:2000/success?email=${req.user.email}`);
});
//google
router.route("/auth/google").get(passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.route("/auth/google/callback").get(passport_1.default.authenticate("google", {
    failureRedirect: 'http://localhost:2000/NotFound'
}), (req, res) => {
    res.redirect(`http://localhost:2000/check`);
});
//Facebook 
router.get('/auth/facebook', passport_1.default.authenticate('facebook'));
router.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', {
    failureRedirect: 'http://localhost:2000/NotFound'
}), (req, res) => {
    // console.log(req.user)
    res.redirect(`http://localhost:2000/success?email=${req.user.email}`);
});
passport_1.default.serializeUser(function (user, cb) {
    process.nextTick(function () {
        /* return cb(null, {
           id: user.id,
           username: user.username,
           picture: user.picture
         })*/
        return cb(null, user);
    });
});
passport_1.default.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
//strategies 
router.route("/check").get((req, res) => {
    res.send({ message: "successfully" });
});
router.route("/success").get((req, res) => {
    res.send({ message: "successfully" });
});
router.route("/register").post(controller.signUp);
router.route("/login").post(controller.login);
router.route("/edit").post(authentication_1.default, controller.updateUser);
router.route("/setpassword").post(controller.setpassword);
router.route("/user").get(authentication_1.default, controller.getAuthenticatedUser);
router.route("/:id").get(controller.verifyAccount);
router.route("/NotFound").post((req, res) => {
    res.send("no user found");
});
exports.default = router;
