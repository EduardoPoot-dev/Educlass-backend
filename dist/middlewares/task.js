"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidations = void 0;
const express_validator_1 = require("express-validator");
const Task_1 = require("../models/Task");
class TaskValidations {
    static async isValidUUID(req, res, next) {
        await (0, express_validator_1.param)('taskId').isUUID(4)
            .withMessage('El ID de la tarea debe ser un UUID').run(req);
        let errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
    static async validateTaskExists(req, res, next) {
        const { taskId } = req.params;
        const task = await Task_1.Task.findByPk(taskId, {
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
}
exports.TaskValidations = TaskValidations;
//# sourceMappingURL=task.js.map