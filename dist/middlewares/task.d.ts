import { Task } from "../models/Task";
import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            task?: Task;
        }
    }
}
export declare class TaskValidations {
    static isValidUUID(req: Request, res: Response, next: NextFunction): Promise<void>;
    static validateTaskExists(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
