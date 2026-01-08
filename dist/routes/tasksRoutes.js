"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const couses_1 = require("../middlewares/couses");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middlewares/validation");
const taskController_1 = require("../controller/taskController");
const task_1 = require("../middlewares/task");
const router = (0, express_1.Router)();
router.use(auth_1.AuthValidations.authenticate);
router.param('courseId', couses_1.CourseValidations.isValidUUID);
router.param('courseId', couses_1.CourseValidations.validateCourseExists);
router.param('taskId', couses_1.CourseValidations.isValidUUID);
router.param('taskId', task_1.TaskValidations.validateTaskExists);
router.get('/:courseId', couses_1.CourseValidations.canAccessCourse, taskController_1.TaskController.getTasks);
router.get('/:courseId/:taskId', couses_1.CourseValidations.canAccessCourse, taskController_1.TaskController.getTask);
// agregar el taskId a los parámetros de la ruta
router.post('/files', taskController_1.TaskController.uploadFiles);
router.post('/:courseId', couses_1.CourseValidations.isCourseCreator, // tiene que ser el creador del curso
(0, express_validator_1.body)('name').notEmpty().withMessage('El nombre es obligatorio'), (0, express_validator_1.body)('description').notEmpty().withMessage('La descripción es obligatoria'), (0, express_validator_1.body)('dueDate').isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'), validation_1.handleInputErrors, taskController_1.TaskController.newTask);
exports.default = router;
//# sourceMappingURL=tasksRoutes.js.map