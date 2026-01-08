import { Request, Response } from 'express';
export declare class TaskController {
    static newTask(req: Request, res: Response): Promise<void>;
    static getTasks(req: Request, res: Response): Promise<void>;
    static getTask(req: Request, res: Response): Promise<void>;
    static uploadFiles(req: Request, res: Response): Promise<void>;
}
