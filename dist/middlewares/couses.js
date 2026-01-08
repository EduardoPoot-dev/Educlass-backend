"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const Course_1 = require("../models/Course");
const express_validator_1 = require("express-validator");
class CourseValidations {
    static canAccessCourse(req, res, next) {
        try {
            const isCourseCreator = req.user.id === req.course.creatorId;
            const isEnrolled = req.course.users.some(user => user.id === req.user.id);
            if (!isCourseCreator && !isEnrolled) {
                res.status(403).json({ error: "No tienes permiso para acceder a este curso" });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el acceso al curso" });
        }
    }
    static async isValidUUID(req, res, next) {
        await (0, express_validator_1.param)('courseId').isUUID(4)
            .withMessage('El ID del curso debe ser un UUID').run(req);
        let errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
    static async notCourseCreator(req, res, next) {
        try {
            const isCourseCreator = req.user.id === req.course.creatorId;
            if (isCourseCreator) {
                res.status(403).json({ error: "Al ser el creador del curso, no tienes permiso para realizar esta acción" });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
        }
    }
    static async isCourseCreator(req, res, next) {
        try {
            const isCourseCreator = req.user.id === req.course.creatorId;
            if (!isCourseCreator) {
                res.status(403).json({ error: "Al no el creador del curso, no tienes permiso para realizar esta acción" });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
        }
    }
    static async belongsToCourse(req, res, next) {
        try {
            const belongsToCourse = req.course.users.some(user => user.id === req.user.id);
            if (belongsToCourse) {
                res.status(403).json({ error: "Ya estás inscrito al curso" });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
        }
    }
    static async isStudent(req, res, next) {
        try {
            const belongsToCourse = req.course.users.some(user => user.id === req.user.id);
            if (!belongsToCourse) {
                res.status(403).json({ error: "Debe estar inscrito al curso" });
                return;
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el creador del curso" });
        }
    }
    static async validateCourseExists(req, res, next) {
        try {
            const course = await Course_1.Course.findByPk(req.params.courseId, {
                include: ['users', 'creator', 'tasks', 'submits']
            });
            if (!course) {
                res.status(404).json({ error: "Curso no encontrado" });
                return;
            }
            req.course = course;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al validar el curso" });
        }
    }
}
exports.CourseValidations = CourseValidations;
//# sourceMappingURL=couses.js.map