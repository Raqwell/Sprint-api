"use strict";

import { Response, Request, NextFunction } from "express";
import { Sprint } from "../models/sprint";

export class SprintRepo {

    public async getAllSprints(req: Request, res: Response): Promise<void> {
        Sprint.find()
        .then(sprints => {
            res.send(sprints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving sprints."
            });
        });
    }

    public async getAllSprintsByUser(req: Request, res: Response): Promise<void> {
        console.log(req.params.user);
        Sprint.find({ user: req.query.user })
        .then(sprints => {
            res.send(sprints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the user's sprints."
            });
        });
    }

    public async getFilteredSprints(req: Request, res: Response): Promise<void> {
        const queryParams = req.query;

        const user = queryParams.user,
        filter = queryParams.filter;

        let filteredSprints;

        Sprint.find({ user: user })
        .then(sprints => {
            
            if(filter) {
                filteredSprints = sprints.filter(sprint => sprint.sprintType.name.trim().toLocaleLowerCase().search(filter.toLocaleLowerCase()) >= 0);
            } else {
                filteredSprints = sprints;
            }
            res.send(filteredSprints);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the user's sprints."
            });
        });
    }

    public async getSprintById(req: Request, res: Response): Promise<void> {
        Sprint.findById(req.params.sprintId)
            .then(sprint => {
                if (!sprint) {
                    res.status(404).send({
                        message: "Sprint with id " + req.params.sprintId + " was not found."
                    });
                }
                else {
                    res.send(sprint);
                }
            }).catch(err => {
                if (err.kind === "ObjectId") {
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

    public async createSprint(req: Request, res: Response): Promise<void> {
        if (!req.body.description) {
            res.status(400).send({
                message: "Description of sprint cannot be empty"
            });
        }
        else {
            const sprint = new Sprint({
                sprintType: {
                    name: req.body.sprintType.name,
                    duration: req.body.sprintType.duration,
                    unit: req.body.sprintType.unit,
                    status: req.body.sprintType.status
                },
                progress: req.body.progress,
                description: req.body.description,
                user: req.body.user,
                notify: req.body.notify,
                createdAt: req.body.createdAt,
                startedAt: req.body.startedAt,
                finishedAt: req.body.finishedAt
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

    public async updateSprint(req: Request, res: Response): Promise<void> {
        Sprint.findByIdAndUpdate(req.params.sprintId, {
            status: req.body.status,
            finish: req.body.finish
        })
            .then(sprint => {
                if (!sprint) {
                    res.status(404).send({
                        message: "Sprint with id " + req.params.sprintId + " was not found."
                    });
                }
                else {
                    res.send(sprint);
                }
            }).catch(err => {
                if (err.kind === "ObjectId") {
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

    public async deleteAllSprintsByUser(req: Request, res: Response): Promise<void> {
       Sprint.deleteMany({ user: req.query.user})
       .then(() => {
           res.status(200).send({
               message: "All the user's sprints have been deleted"
           });
       }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while deleting the user's sprints."
        });
       });
    }

    public async deleteSprint(req: Request, res: Response): Promise<void> {
        Sprint.findByIdAndRemove(req.query.sprintId)
            .then(sprint => {
                if (!sprint) {
                    res.status(404).send({
                        message: "Sprint with id " + req.query.sprintId + " was not found."
                    });
                }
                else {
                    res.send({ message: "Sprint deleted succesfully" });
                }
            }).catch(err => {
                if (err.kind === "ObjectId") {
                    res.status(404).send({
                        message: "Sprint with id " + req.query.sprintId + " was not found."
                    });
                }
                else {
                    res.status(500).send({
                        message: err.message || "Some error occured while deleting sprint with id " + req.query.sprintId
                    });
                }
            });
    }

}

export const sprintRepo = new SprintRepo();