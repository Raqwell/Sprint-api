"use strict";

import { Response, Request, NextFunction } from "express";
import { sprintRepo } from "../repositories/sprintRepo";

export class SprintService {
    public async getAllSprints(req: Request, res: Response): Promise<void> {
        return await sprintRepo.getAllSprints(req, res);
    }

    public async getAllSprintsByUser(req: Request, res: Response): Promise<void> {
        return await sprintRepo.getAllSprintsByUser(req, res);
    }

    public async getFilteredSprints(req: Request, res: Response): Promise<void> {
        return await sprintRepo.getFilteredSprints(req, res);
    }

    public async getSprintById(req: Request, res: Response): Promise<void> {
        return await sprintRepo.getSprintById(req, res);
    }

    public async createSprint(req: Request, res: Response): Promise<void> {
        return await sprintRepo.createSprint(req, res);
    }

    public async updateSprint(req: Request, res: Response): Promise<void> {
        return await sprintRepo.updateSprint(req, res);
    }

    public async deleteAllSprintsByUser(req: Request, res: Response): Promise<void> {
        return await sprintRepo.deleteAllSprintsByUser(req, res);
    }

    public async deleteSprint(req: Request, res: Response): Promise<void> {
        return await sprintRepo.deleteSprint(req, res);
    }
}


export const sprintService = new SprintService();