const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const router = require("./api/routes/routes");
const services = require("./api/services/service");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const upload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(cors());
app.use(upload());

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const User = require("./api/models/User");

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err);
    });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/events",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ googleId: profile.id, email: profile.emails[0].value }, function (err, user) {
    return cb(err, user);
  });
}
));

app.use("/", router);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//Listening to client requests.
app.listen(port, function () {
  console.log("Server running on port 3000.");
});

module.exports = app;
