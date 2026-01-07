import { Router } from "express";
import { TaskValidations } from "../middlewares/task";
import { SubmitController } from "../controller/submitController";
import { AuthValidations } from "../middlewares/auth";
import { CourseValidations } from "../middlewares/couses";

const router = Router()

router.use(AuthValidations.authenticate)

router.param('courseId', CourseValidations.isValidUUID);
router.param('courseId', CourseValidations.validateCourseExists);

router.param('taskId', TaskValidations.isValidUUID);
router.param('taskId', TaskValidations.validateTaskExists);

router.get('/:courseId/user-submits',
    CourseValidations.notCourseCreator,
    SubmitController.getSubmitsCourse
)

router.get('/:courseId/:taskId',
    CourseValidations.isCourseCreator,
    SubmitController.getTaskSubmissions
)

router.get('/:courseId/:taskId/submit',
    CourseValidations.canAccessCourse,
    SubmitController.getSubmission
)



router.post('/:courseId/:taskId', 
    CourseValidations.notCourseCreator,
    CourseValidations.isStudent,
    SubmitController.submitTask
)

export default router;