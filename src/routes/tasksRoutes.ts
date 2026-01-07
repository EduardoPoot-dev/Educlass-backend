import { Router } from "express";
import { AuthValidations } from "../middlewares/auth";
import { CourseValidations } from "../middlewares/couses";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controller/taskController";
import { TaskValidations } from "../middlewares/task";



const router = Router();

router.use(AuthValidations.authenticate);

router.param('courseId', CourseValidations.isValidUUID);
router.param('courseId', CourseValidations.validateCourseExists);

router.param('taskId', CourseValidations.isValidUUID)
router.param('taskId', TaskValidations.validateTaskExists);

router.get('/:courseId', 
    CourseValidations.canAccessCourse,
    TaskController.getTasks
)

router.get('/:courseId/:taskId', 
    CourseValidations.canAccessCourse,
    TaskController.getTask
)

// agregar el taskId a los parámetros de la ruta
router.post('/files', TaskController.uploadFiles);

router.post('/:courseId', 
    CourseValidations.isCourseCreator,// tiene que ser el creador del curso
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('dueDate').isISO8601().withMessage('La fecha de vencimiento debe ser una fecha válida'),   
    handleInputErrors,
    TaskController.newTask
)


export default router;