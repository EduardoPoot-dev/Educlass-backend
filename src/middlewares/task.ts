import { param, validationResult } from "express-validator";
import { Task } from "../models/Task";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            task?: Task; // Attach the task to the request object
        }
    }
}

export class TaskValidations {

    static async isValidUUID(req: Request, res: Response, next: NextFunction) {
            await param('taskId').isUUID(4)
                .withMessage('El ID de la tarea debe ser un UUID').run(req)
    
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return
            }
    
            next()
        }

    static async validateTaskExists(req: Request, res: Response, next: NextFunction) {
        const { taskId } = req.params;

        const task = await Task.findByPk(taskId, {
            include: [
                {
                    association: 'course',
                    attributes: ['name']
                },
                {
                    association: 'submits',
                    include: [
                        {
                            association: 'files',
                            attributes: ['url']
                        }
                    ]
                },
            ]
            
        });
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        req.task = task; // Attach the task to the request object

        next();
    }

    // static async isSubmitCreator(req: Request, res: Response, next: NextFunction) {

    // }



}