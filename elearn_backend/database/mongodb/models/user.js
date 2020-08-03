let mongoose = require('../connection');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  name: String,
  age: String
});

UserSchema.plugin(passportLocalMongoose);
let User = mongoose.model('userInfo', UserSchema, 'userInfo');

// User.register({username:'paul', active: false}, 'paul');
// User.register({username:'jay', active: false}, 'jay');
// User.register({username:'roy', active: false}, 'roy');

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;