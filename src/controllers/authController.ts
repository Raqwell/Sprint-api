"use strict";

import { Response, Request, NextFunction } from "express";
import passport from "passport";
import mongoose from "mongoose";
import { ResponseError } from "superagent";
import { User, UserDocument } from "../models/user";


export class AuthController {

    constructor() { 
        console.log("construction");
    }

    public async register(req: any, res: any): Promise<void> {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });


        user.schema.methods.setPassword(req.body.password, user);
        // user.hash and user.salt have not updated; 

        user.save()
        .then(() => {
            const token = user.schema.methods.generateJwt(user);
            res.status(200).send({ "token": token });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while saving the user."
            });
        });
    }

    public async login(req: any, res: any): Promise<void> {
        passport.authenticate("local", (err: any, user: any, info: any) => {
            let token;

            if(err) {
                res.status(404).send({
                    message: err.message || "Something went wrong while authenticating the user."
                });
            } else {
                if(user) {
                    token = user.schema.methods.generateJwt(user);
                    res.status(200).send({ "token" : token });
                } else {
                    res.status(401).json(info);
                }
            }
        });
    }
}

export const authController = new AuthController();