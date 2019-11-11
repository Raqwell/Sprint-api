import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
    profile: {
        name: string;
        gender: string;
    };
};

const userSchema = new mongoose.Schema({
    email: { type:String, unique:true },
    profile: {
        name: String,
        gender: String
    }
});

export const User = mongoose.model<UserDocument>("User", userSchema);