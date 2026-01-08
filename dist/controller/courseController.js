"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Course_1 = require("../models/Course");
const bcrypt_2 = require("../utils/bcrypt");
const User_1 = require("../models/User");
const formidable_1 = __importDefault(require("formidable"));
const cloudinary_1 = require("../config/cloudinary");
const sequelize_1 = require("sequelize");
class CourseController {
    static async getCourses(req, res) {
        try {
            const courses = await User_1.User.findByPk(req.user.id, {
                include: [
                    {
                        association: 'enrolledCourses',
                        attributes: ['id', 'name', 'grade', 'group',],
                        include: [
                            {
                                association: 'creator',
                                attributes: ['name', 'id']
                            }
                        ]
                    },
                    {
                        association: 'createdCourses',
                        attributes: ['id', 'name', 'grade', 'group',],
                        include: [
                            {
                                association: 'creator',
                                attributes: ['name', 'id']
                            }
                        ]
                    }
                ],
                attributes: [],
            });
            res.json(courses);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los cursos' });
        }
    }
    static async getCourse(req, res) {
        try {
            res.json(req.course);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener el curso' });
        }
    }
    static async newCourse(req, res) {
        try {
            const course = new Course_1.Course(req.body);
            course.creatorId = req.user.id;
            course.password = await (0, bcrypt_2.hashPassword)(req.body.password);
            await course.save();
            res.json('Curso creado correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
    static async joinCourse(req, res) {
        try {
            const isCorrectPassword = await bcrypt_1.default.compare(req.body.password, req.course.password);
            if (!isCorrectPassword) {
                res.status(400).json({ error: 'Contraseña incorrecta' });
                return;
            }
            await req.course.$add('users', req.user.id);
            res.json('Te has unido al curso correctamente');
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error al unirse al curso' });
        }
    }
    static async courseBackground(req, res) {
        try {
            const form = (0, formidable_1.default)();
            const [, fields] = await form.parse(req);
            if (!fields.file) {
                const error = new Error('No se ha subido ningún elemento');
                res.status(400).json(error.message);
                return;
            }
            const image = await (0, cloudinary_1.uploadImage)(fields.file[0].filepath);
            res.status(201).json(image.secure_url);
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getAvailableCourses(req, res) {
        try {
            const courses = await Course_1.Course.findAll({
                where: {
                    creatorId: {
                        [sequelize_1.Op.ne]: req.user.id,
                    },
                },
                include: [
                    {
                        association: 'creator',
                        attributes: ['name', 'id']
                    }
                ]
            });
            res.json(courses);
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getUsersCourse(req, res) {
        try {
            const users = await Course_1.Course.findOne({
                where: {
                    id: req.course.id
                },
                attributes: [],
                include: [
                    {
                        association: 'users',
                        attributes: ['name', 'email']
                    }
                ]
            });
            res.json(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error al obtener el curso' });
        }
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=courseController.js.map