"use strict";

import { Controller, Get, Route } from "tsoa";
import { Response, Request, NextFunction } from "express";
import { Sprint } from "../models/sprint";
import { sprintService } from "../services/sprintService";

@Route("/sprints")
export class SprintController extends Controller {

    @Get("")
    public async getAllSprints(req: Request, res: Response): Promise<void> {
        return await sprintService.getAllSprints(req, res);
    }

    /**
     * Get all sprints attached to the user.
     * @param req The request
     * @param res The response
     */
    @Get("/:user")
    public async getAllSprintsByUser(req: Request, res: Response): Promise<void> {
        return await sprintService.getAllSprintsByUser(req, res);
    }

    /**
     * Get the sprints matching the filter
     * @param req 
     * @param res 
     */
    public async getFilteredSprints(req: Request, res: Response): Promise<void> {
        return await sprintService.getFilteredSprints(req, res);
    }

    /**
     * Get a sprint attached by its id.
     * @param req 
     * @param res 
     */
    public async getSprintById(req: Request, res: Response): Promise<void> {  
        return await sprintService.getSprintById(req, res);
    }

    /**
     * Create a sprint attached to the user.
     * @param req 
     * @param res 
     */
    public async createSprint(req: Request, res: Response): Promise<void> {
        return await sprintService.createSprint(req, res);
    }

    /**
     * Update a sprint attached to the user by its id.
     * @param req 
     * @param res 
     */
    public async updateSprint(req: Request, res: Response): Promise<void> {
        return await sprintService.updateSprint(req, res);
    }

    /**
     * Delete all sprints attached to the user.
     * @param req 
     * @param res 
     */
    public async deleteAllSprintsByUser(req: Request, res: Response): Promise<void> {
        return await sprintService.deleteAllSprintsByUser(req, res);
    }

    /**
     * Delete a sprint attached to the user by its id.
     * @param req 
     * @param res 
     */
    public async deleteSprint(req: Request, res: Response): Promise<void> {
        return await sprintService.deleteSprint(req, res);
    }
}

export const sprintController = new SprintController();