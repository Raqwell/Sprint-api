"use strict";

import { Response, Request, NextFunction } from "express";


/**
 * GET /api
 * List of API examples.
 */



export class ApiController  {
    constructor(
    ) {
        console.log("construction");
    }
  
    /**
     * Start a new GDF process instance and return its associated Camunda Process ID
     * @param req The request
     * @param res The response
     */
    public async getApi(req: Request, res: Response): Promise<void> {
        res.json({allo: "toi"});
    }
  }
  


  export const apiController = new ApiController( );
  

