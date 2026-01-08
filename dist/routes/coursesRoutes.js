"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middlewares/validation");
const courseController_1 = require("../controller/courseController");
const couses_1 = require("../middlewares/couses");
const router = (0, express_1.Router)();
router.use(auth_1.AuthValidations.authenticate);
router.param('courseId', couses_1.CourseValidations.isValidUUID);
router.param('courseId', couses_1.CourseValidations.validateCourseExists);
router.get('/', courseController_1.CourseController.getCourses);
router.get('/available-courses', courseController_1.CourseController.getAvailableCourses);
router.get('/:courseId', couses_1.CourseValidations.canAccessCourse, courseController_1.CourseController.getCourse);
router.get('/:courseId/students', couses_1.CourseValidations.isCourseCreator, courseController_1.CourseController.getUsersCourse);
router.post('/', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre es obligatorio'), (0, express_validator_1.body)('password')
    .custom(value => value.length >= 8)
    .withMessage('Pasword debe tener al menos 8 caracteres'), (0, express_validator_1.body)('grade')
    .notEmpty().withMessage('El grado es obligatorio'), (0, express_validator_1.body)('group')
    .notEmpty().withMessage('El grupo es obligatorio'), (0, express_validator_1.body)('background')
    .notEmpty().withMessage('Una imagen es obligatoria'), validation_1.handleInputErrors, courseController_1.CourseController.newCourse);
router.post('/image', courseController_1.CourseController.courseBackground);
// not belongs to course
router.post('/:courseId', couses_1.CourseValidations.notCourseCreator, couses_1.CourseValidations.belongsToCourse, (0, express_validator_1.body)('password')
    .notEmpty().withMessage('La contraseña es obligatoria'), validation_1.handleInputErrors, courseController_1.CourseController.joinCourse);
exports.default = router;
//# sourceMappingURL=coursesRoutes.js.map