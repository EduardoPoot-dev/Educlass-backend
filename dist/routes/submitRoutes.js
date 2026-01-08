"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../middlewares/task");
const submitController_1 = require("../controller/submitController");
const auth_1 = require("../middlewares/auth");
const couses_1 = require("../middlewares/couses");
const router = (0, express_1.Router)();
router.use(auth_1.AuthValidations.authenticate);
router.param('courseId', couses_1.CourseValidations.isValidUUID);
router.param('courseId', couses_1.CourseValidations.validateCourseExists);
router.param('taskId', task_1.TaskValidations.isValidUUID);
router.param('taskId', task_1.TaskValidations.validateTaskExists);
router.get('/:courseId/user-submits', couses_1.CourseValidations.notCourseCreator, submitController_1.SubmitController.getSubmitsCourse);
router.get('/:courseId/:taskId', couses_1.CourseValidations.isCourseCreator, submitController_1.SubmitController.getTaskSubmissions);
router.get('/:courseId/:taskId/submit', couses_1.CourseValidations.canAccessCourse, submitController_1.SubmitController.getSubmission);
router.post('/:courseId/:taskId', couses_1.CourseValidations.notCourseCreator, couses_1.CourseValidations.isStudent, submitController_1.SubmitController.submitTask);
exports.default = router;
//# sourceMappingURL=submitRoutes.js.map