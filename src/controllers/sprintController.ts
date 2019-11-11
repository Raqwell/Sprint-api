"use strict";

import { Response, Request, NextFunction } from "express";
import { Sprint } from "../models/sprint";

export class SprintController {
    constructor() {
        console.log("construction");
    }
    
    /**
     * Start a new GDF process instance and return its associated Camunda Process ID
     * @param req The request
     * @param res The response
     */
    public async getAllSprints(req: Request, res: Response): Promise<void> {
        Sprint.find()
        .then(sprints => {
            res.send(sprints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users."
            });
        });
    }
}

export const sprintController = new SprintController();