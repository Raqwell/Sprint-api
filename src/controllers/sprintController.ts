"use strict";

import { Response, Request, NextFunction } from "express";
import { Sprint } from "../models/sprint";

export class SprintController {
    constructor() { 
        console.log("construction");
    }
    
    /**
     * Get all sprints attached to the user.
     * @param req The request
     * @param res The response
     */
    public async getAllSprints(req: Request, res: Response): Promise<void> {
        // retrieve current user
        // find user id in db
        // get all sprints that match this id
        Sprint.find()
        .then(sprints => {
            res.send(sprints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving users."
            });
        });
    }

    /**
     * Get a sprint attached to the user by its id.
     * @param req 
     * @param res 
     */
    public async getSprint(req: Request, res: Response): Promise<void> {   
        // add userId     
        Sprint.findById(req.params.sprintId)
        .then(sprint => {
            if(!sprint) {
                res.status(404).send({
                    message: "Sprint with id " + req.params.sprintId + " was not found."
                });
            }
            else {
                res.send(sprint);
            }
        }).catch(err => {
            if(err.kind === "ObjectId") {
                res.status(404).send({
                    message: "Sprint with id " + req.params.sprintId + " was not found."
                });                
            } 
            else {
                res.status(500).send({
                    message: "Some error occured while retrieving sprint with id " + req.params.sprintId
                });
            }
        });
    }

    /**
     * Create a sprint attached to the user.
     * @param req 
     * @param res 
     */
    public async createSprint(req: Request, res: Response): Promise<void> {
        if(!req.body.description) {
            res.status(400).send({
                message: "Description of sprint cannot be empty"
            });
        } 
        else {
            const sprint = new Sprint({
                userId: req.body.userId,
                length: req.body.length,
                status: req.body.status,
                createdAt: req.body.created_at,
                finish: req.body.finish,
                description: req.body.description
            });
    
            sprint.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something went wrong while creating the sprint."
                });
            });
        }
    }

    /**
     * Update a sprint attached to the user by its id.
     * @param req 
     * @param res 
     */
    public async updateSprint(req: Request, res: Response): Promise<void> {
        // add userId
        Sprint.findByIdAndUpdate(req.params.sprintId, {
            status: req.body.status,
            finish: req.body.finish
        })
        .then(sprint => {
            if(!sprint) {
                res.status(404).send({
                    message: "Sprint with id " + req.params.sprintId + " was not found."
                });
            }
            else {
                res.send(sprint);
            }
        }).catch(err => {
            if(err.kind === "ObjectId") {
                res.status(404).send({
                    message: "Sprint with id " + req.params.sprintId + " was not found."
                });                
            } 
            else {
                res.status(500).send({
                    message: "Some error occured while updating sprint with id " + req.params.sprintId
                });
            }
        });
    }

    /**
     * Delete all sprints attached to the user.
     * @param req 
     * @param res 
     */
    public async deleteAllSprints(req: Request, res: Response): Promise<void> {
        res.json({allo: "toi"});
    }

    /**
     * Delete a sprint attached to the user by its id.
     * @param req 
     * @param res 
     */
    public async deleteSprint(req: Request, res: Response): Promise<void> {
        // add userId
        Sprint.findByIdAndRemove(req.params.sprintId)
        .then(sprint => {
            if(!sprint) {
                res.status(404).send({
                    message: "Sprint with id " + req.params.sprintId + " was not found."
                });
            }
            else {
                res.send({ message: "Sprint deleted succesfully"});
            }
        }).catch(err => {
            if(err.kind === "ObjectId") {
                res.status(404).send({
                    message: "Sprint with id " + req.params.sprintId + " was not found."
                });                
            } 
            else {
                res.status(500).send({
                    message: "Some error occured while deleting sprint with id " + req.params.sprintId
                });
            }
        });
    }
}

export const sprintController = new SprintController();