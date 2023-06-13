"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const modal_1 = __importDefault(require("../modal/modal"));
const passportStragetiesConfig = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: "161165475594-olso0o49a0dibh391f2aha8cf47dk7nf.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:2000/auth/google/callback"
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield modal_1.default.findOne({
                    email: profile.emails[0].value
                });
                if (user) {
                    console.log("user experience");
                    done(null, user);
                }
                else {
                    user = yield modal_1.default.create({
                        email: profile.emails[0].value,
                        password: "passwordhhh",
                        bio: "greater",
                        phone: 1290,
                        name: profile.displayName,
                        //  profileUrl: profile.photos[0].value,
                        verified: true
                    });
                    //  done(null, user)
                }
            }
            catch (erro) {
                console.log(erro);
            }
        });
    }));
    //GitHubStrategy
    passport.use(new GitHubStrategy({
        clientID: "da57dd355874c6f4790b",
        clientSecret: "c049e291855f3f7ebce2b04c8b612437d3730096",
        callbackURL: "http://localhost:2000/auth/github/callback"
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, avatar_url, email, bio } = profile._json;
            try {
                const user = yield modal_1.default.create({
                    email: email,
                    password: "password",
                    bio: bio,
                    name: login,
                    profileUrl: avatar_url,
                });
                console.log(user);
                done(null, user);
            }
            catch (erro) {
                console.log(erro);
            }
        });
    }));
    passport.use(new TwitterStrategy({
        consumerKey: "u6HMvVjImWdPDihxsC3tgoDBw",
        consumerSecret: "Y0vQXohP3GqB22e8F2eoRNKMatDlf08JxcVmv5Ot9gh3lXFZZz",
        callbackURL: "http:localhost:2000/auth/twitter/callback"
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield modal_1.default.findOne({
                    email: profile.emails[0].value
                });
                if (userExist) {
                    console.log("user exist");
                    done(null, userExist);
                }
                else {
                    const user = yield modal_1.default.create({
                        email: profile.emails[0].value,
                        password: "password",
                        bio: "",
                        name: profile.displayName,
                        profileUrl: profile.photos[0].value,
                    });
                    // console.log(user)
                    done(null, user);
                }
            }
            catch (erro) {
                console.log(erro);
            }
        });
    }));
    passport.use(new FacebookStrategy({
        clientID: "640549644612277",
        clientSecret: "eaa49820ff8ff4918c4d55e49a14de91",
        callbackURL: "http://localhost:2000/auth/facebook/callback",
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* const user =await User.create({
                    email:profile.emails[0].value,
                   password:"password",
                    bio:"",
                    name: profile.displayName,
                    profileUrl: profile.photos[0].value,
                  });*/
                console.log(profile);
                //  done(null, user)
            }
            catch (erro) {
                console.log(erro);
            }
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        ////	done(null, user)
    });
};
exports.default = passportStragetiesConfig;
