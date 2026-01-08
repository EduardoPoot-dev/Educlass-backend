import { Request, Response } from "express";
export declare class CourseController {
    static getCourses(req: Request, res: Response): Promise<void>;
    static getCourse(req: Request, res: Response): Promise<void>;
    static newCourse(req: Request, res: Response): Promise<void>;
    static joinCourse(req: Request, res: Response): Promise<void>;
    static courseBackground(req: Request, res: Response): Promise<void>;
    static getAvailableCourses(req: Request, res: Response): Promise<void>;
    static getUsersCourse(req: Request, res: Response): Promise<void>;
}
