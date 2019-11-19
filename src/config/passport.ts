import passport from "passport";
import mongoose from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";
import { User, UserDocument } from "../models/user";
//const User = mongoose.model("User");

passport.use(new LocalStrategy({
  usernameField: "email"
},
function(username: string, password: string, done: any) {
  User.findOne({ email: username }, function (err: Error, user: UserDocument) {
    if (err) { return done(err); }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: "User not found"
      });
    }
    // Return if password is wrong
    if (!user.schema.methods.validPassword(password, user)) {
      return done(null, false, {
        message: "Password is wrong"
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}
));