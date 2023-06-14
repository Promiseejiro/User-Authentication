const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { profile } from "console";
import User from "../modal/modal";
const passportStragetiesConfig = (passport: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "161165475594-olso0o49a0dibh391f2aha8cf47dk7nf.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:2000/auth/google/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        try {
          let user = await User.findOne({
            email: profile.emails[0].value,
          });
          if (user) {
            User.findOne(
              { googleId: profile.id },
              function (err: any, user: any) {
                console.log("user experience");
                console.log(user);
                return done(err, user);
              }
            );
          } else {
            user = await User.create({
              email: profile.emails[0].value,
              password: "passwordhhh",
              bio: "greater",
              phone: 1290,
              name: profile.displayName,
              profileUrl: profile.photos[0].value,
              verified: true,
            });
            // return done(null, user);
          }
        } catch (erro) {
          console.log(erro);
        }
      }
    )
  );

  //GitHubStrategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: "da57dd355874c6f4790b",
        clientSecret: "c049e291855f3f7ebce2b04c8b612437d3730096",
        callbackURL: "http://localhost:2000/auth/github/callback",
      },

      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        const { login, avatar_url, email, bio } = profile._json;
        try {
          const user = await User.create({
            email: email,
            password: "password",
            bio: bio,
            name: login,
            profileUrl: avatar_url,
          });
          console.log(user);
          done(null, user);
        } catch (erro) {
          console.log(erro);
        }
      }
    )
  );
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: "u6HMvVjImWdPDihxsC3tgoDBw",
        consumerSecret: "Y0vQXohP3GqB22e8F2eoRNKMatDlf08JxcVmv5Ot9gh3lXFZZz",
        callbackURL: "http:localhost:2000/auth/twitter/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        try {
          const userExist = await User.findOne({
            email: profile.emails[0].value,
          });
          if (userExist) {
            console.log("user exist");
            done(null, userExist);
          } else {
            const user = await User.create({
              email: profile.emails[0].value,
              password: "password",
              bio: "",
              name: profile.displayName,
              profileUrl: profile.photos[0].value,
            });
            // console.log(user)
            done(null, user);
          }
        } catch (erro) {
          console.log(erro);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: "640549644612277",
        clientSecret: "eaa49820ff8ff4918c4d55e49a14de91",
        callbackURL: "http://localhost:2000/auth/facebook/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
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
        } catch (erro) {
          console.log(erro);
        }
      }
    )
  );
};

export default passportStragetiesConfig;
