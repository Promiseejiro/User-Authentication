const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


moddule.export = function (passport){
passport.use(new GoogleStrategy({
    clientID: "161165475594-olso0o49a0dibh391f2aha8cf47dk7nf.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:2000/auth/google/callback"
  },
  async function(accessToken:any, refreshToken:any, profile:any, done:any) {
 const user =await User.create({
      email:profile.emails[0].value,
      bio:"",
      password:"password",
      name: profile.displayName,
      profileUrl: profile.photos[0].value,
    });
    console.log(user)
    return done(null, user)
  }
));

//GitHubStrategy
passport.use(new GitHubStrategy({
    clientID: "da57dd355874c6f4790b",
    clientSecret: "c049e291855f3f7ebce2b04c8b612437d3730096",
    callbackURL: "http://localhost:2000/auth/github/callback"
  },
  
async  function(accessToken:any, refreshToken:any, profile:any, done:any) {
  console.log(profile._json)
  const {login ,avatar_url, email,bio} = profile._json
  const user =await User.create({
      email:email,
            password:"password",
      bio:bio,
      name: login,
      profileUrl: avatar_url,
    });
    console.log(user)
    return done(null, user)
  }
));
passport.use(new TwitterStrategy({
    consumerKey: "u6HMvVjImWdPDihxsC3tgoDBw",
    consumerSecret: "Y0vQXohP3GqB22e8F2eoRNKMatDlf08JxcVmv5Ot9gh3lXFZZz",
    callbackURL: "http:localhost:2000/auth/twitter/callback"
  },
  async  function(accessToken:any, refreshToken:any, profile:any, done:any) {
    
  const user =await User.create({
      email:profile.emails[0].value,
            password:"password",
      bio:"",
      name: profile.displayName,
      profileUrl: profile.photos[0].value,
    });
    console.log(user)
    return done(null, user)
  }
));
passport.use(new FacebookStrategy({
    clientID: "640549644612277",
    clientSecret: "eaa49820ff8ff4918c4d55e49a14de91",
    callbackURL: "http://localhost:2000/auth/facebook/callback",
  },
   async   function(accessToken:any, refreshToken:any, profile:any, done:any) {
 const user =await User.create({
      email:profile.emails[0].value,
     password:"password",
      bio:"",
      name: profile.displayName,
      profileUrl: profile.photos[0].value,
    });
    console.log(user)
    return done(null, user)
  }
));
}