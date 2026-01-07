import { Router } from "express";
import { AuthValidations } from "../middlewares/auth";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { CourseController } from "../controller/courseController";
import { CourseValidations } from "../middlewares/couses";


const router = Router()

router.use(AuthValidations.authenticate)

router.param('courseId', CourseValidations.isValidUUID)
router.param('courseId', CourseValidations.validateCourseExists)

router.get('/', CourseController.getCourses)

router.get('/available-courses', CourseController.getAvailableCourses)

router.get('/:courseId',
    CourseValidations.canAccessCourse,
    CourseController.getCourse
)

router.get('/:courseId/students', 
    CourseValidations.isCourseCreator,
    CourseController.getUsersCourse
)



router.post('/',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('password')
        .custom( value => value.length >= 8)
        .withMessage('Pasword debe tener al menos 8 caracteres'),
    body('grade')
        .notEmpty().withMessage('El grado es obligatorio'),
    body('group')
        .notEmpty().withMessage('El grupo es obligatorio'),
    body('background')
        .notEmpty().withMessage('Una imagen es obligatoria'),
    handleInputErrors,
    CourseController.newCourse
)

router.post('/image', 
    CourseController.courseBackground
)

// not belongs to course
router.post('/:courseId',
    CourseValidations.notCourseCreator,
    CourseValidations.belongsToCourse,
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    CourseController.joinCourse
)


export default router