import { Request, Response } from 'express';
export declare class SubmitController {
    static submitTask(req: Request, res: Response): Promise<void>;
    static getTaskSubmissions(req: Request, res: Response): Promise<void>;
    static getSubmission(req: Request, res: Response): Promise<void>;
    static getSubmitsCourse(req: Request, res: Response): Promise<void>;
}
