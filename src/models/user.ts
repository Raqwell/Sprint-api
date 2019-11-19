import mongoose from "mongoose";
import crypto from "crypto";
import { HASH_SECRET } from "../util/secrets";
import jwt from "jsonwebtoken";

export type UserDocument = mongoose.Document &{
    email: string;
    name: string;
    hash: string;
    salt: string;
} 

const userSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: String,
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password: string, user: UserDocument) {
    user.salt = crypto.randomBytes(16).toString("hex");
    user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
};

userSchema.methods.validPassword = function(password: string, user: UserDocument) {
    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");
    return user.hash === hash;
};

userSchema.methods.generateJwt = function(user: UserDocument) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: user._id,
      email: user.email,
      name: user.name,
      exp: expiry.getTime() / 1000,
    }, HASH_SECRET);
  };

export const User: mongoose.Model<UserDocument> = mongoose.model<UserDocument>("User", userSchema);