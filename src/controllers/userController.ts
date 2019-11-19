"use strict";

import { Response, Request, NextFunction } from "express";
import { User, UserDocument } from "../models/user";
/* import mongoose from "mongoose";

const User = mongoose.model("User"); */

export class UserController  {
    constructor() {
        console.log("construction");
    }
  
    /**
     * Start a new GDF process instance and return its associated Camunda Process ID
     * @param req The request
     * @param res The response
     */
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users."
            });
        });
    }

    public async readProfile(req: any, res: Response): Promise<void> {
        if(!req.payload._id) {
            res.status(401).send({
                "message" : "UnauthorizedError: private profile"
            });
        } else {
            User.findById(req.payload._id)
            .exec(user => {
                res.send(user);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while reading the user profile."
                });
            });
        }
    }
}

export const userController = new UserController( );
  




























    /**
     * GET /account
     * Display user account.
     
    public async getUser(req: Request, res: Response, next: NextFunction) {
        const PARAM_ID: string = "id";
        if (typeof req.params[PARAM_ID] === "undefined" || req.params[PARAM_ID] === null) {
          res.sendStatus(404);
          next();
          return;
        }

        const id = req.params[PARAM_ID];

        console.log(`[UsersApi.get] Retrieving user: {id: ${req.params.id}}.`);

        User.findById(id).then((user: UserDocument) => {
            //verify user was found
            if (user === null) {
              res.sendStatus(404);
              next();
              return;
            }
      
            //send json response
            res.json(user);
            next();
          }).catch(next);
    }
    */