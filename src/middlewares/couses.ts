import { Request, Response, NextFunction } from "express";  
import { Course } from "../models/Course";
import { param, validationResult } from "express-validator";

declare global {
    namespace Express {
        interface Request {
            course?: Course; // Attach the course to the request object
        }
    }
}

export class CourseValidations {

    static canAccessCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const isCourseCreator = req.user.id === req.course.creatorId;
            const isEnrolled = req.course.users.some(user => user.id === req.user.id);
            
            if (!isCourseCreator && !isEnrolled) {
                res.status(403).json({ error: "No tienes permiso para acceder a este curso" });
                return;
            }

            next()
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el acceso al curso" });
            
        }
    }

    static async isValidUUID(req: Request, res: Response, next: NextFunction) {
        await param('courseId').isUUID(4)
            .withMessage('El ID del curso debe ser un UUID').run(req)

        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        next()
    }

    static async notCourseCreator(req: Request, res: Response, next: NextFunction) {
        try {
            const isCourseCreator = req.user.id === req.course.creatorId;

            if (isCourseCreator) {
                res.status(403).json({ error: "Al ser el creador del curso, no tienes permiso para realizar esta acción" });
                return;
            }

            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
            
        }
    }

    static async isCourseCreator(req: Request, res: Response, next: NextFunction) {
        try {
            const isCourseCreator = req.user.id === req.course.creatorId;
         
            if (!isCourseCreator) {
                res.status(403).json({ error: "Al no el creador del curso, no tienes permiso para realizar esta acción" });
                return;
            }

            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
            
        }
    }

    static async belongsToCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const belongsToCourse = req.course.users.some(user => user.id === req.user.id);
            
            if (belongsToCourse) {
                res.status(403).json({ error: "Ya estás inscrito al curso" });
                return;
            }

            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
            
        }
    }

    static async isStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const belongsToCourse = req.course.users.some(user => user.id === req.user.id);
            
            if (!belongsToCourse) {
                res.status(403).json({ error: "Debe estar inscrito al curso" });
                return;
            }

            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
            
        }
    }

    static async validateCourseExists(req: Request, res: Response, next: NextFunction) {
        try {
           
            const course = await Course.findByPk(req.params.courseId, {
                include: ['users', 'creator', 'tasks', 'submits']	
            });
            
            if (!course) {
                res.status(404).json({ error: "Curso no encontrado" });
                return;
            }
            req.course = course; 

            next()
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el curso" });
        }
    }
}