import { Request, Response, NextFunction } from "express";
import { Course } from "../models/Course";
declare global {
    namespace Express {
        interface Request {
            course?: Course;
        }
    }
}
export declare class CourseValidations {
    static canAccessCourse(req: Request, res: Response, next: NextFunction): void;
    static isValidUUID(req: Request, res: Response, next: NextFunction): Promise<void>;
    static notCourseCreator(req: Request, res: Response, next: NextFunction): Promise<void>;
    static isCourseCreator(req: Request, res: Response, next: NextFunction): Promise<void>;
    static belongsToCourse(req: Request, res: Response, next: NextFunction): Promise<void>;
    static isStudent(req: Request, res: Response, next: NextFunction): Promise<void>;
    static validateCourseExists(req: Request, res: Response, next: NextFunction): Promise<void>;
}
