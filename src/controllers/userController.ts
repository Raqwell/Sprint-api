"use strict";

import { Response, Request, NextFunction } from "express";
import { User, UserDocument } from "../models/user";

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