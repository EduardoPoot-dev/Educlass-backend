import bcrypt from 'bcrypt';
import { Request, Response } from "express"
import { Course } from "../models/Course"
import { hashPassword } from "../utils/bcrypt"
import { User } from '../models/User';
import formidable from 'formidable';
import { uploadImage } from '../config/cloudinary';
import { Op } from 'sequelize'

export class CourseController {

    static async getCourses(req: Request, res: Response) {
        try {
            const courses = await User.findByPk(req.user.id, {
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
            })

            res.json(courses)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener los cursos' })
        }
    }

    static async getCourse(req: Request, res: Response) {
        try {


            res.json(req.course)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al obtener el curso' })
        }
    }

    static async newCourse(req: Request, res: Response) {
        try {
            const course = new Course(req.body)

            course.creatorId = req.user.id
            course.password = await hashPassword(req.body.password)

            await course.save()

            res.json('Curso creado correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static async joinCourse(req: Request, res: Response) {
        try {
            const isCorrectPassword = await bcrypt.compare(req.body.password, req.course.password)

            if (!isCorrectPassword) {
                res.status(400).json({ error: 'Contraseña incorrecta' })
                return
            }

            await req.course.$add('users', req.user.id)

            res.json('Te has unido al curso correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error al unirse al curso' })

        }
    }

    static async courseBackground(req: Request, res: Response) {
        try {
            const form = formidable()

            const [, fields] = await form.parse(req)

            if (!fields.file) {
                const error = new Error('No se ha subido ningún elemento')
                res.status(400).json(error.message)
                return
            }

            const image = await uploadImage(fields.file[0].filepath)

            res.status(201).json(image.secure_url)
        } catch (error) {
            console.log(error)
        }
    }

    static async getAvailableCourses(req: Request, res: Response) {
        try {
            const courses = await Course.findAll({
                where: {
                    creatorId: {
                        [Op.ne]: req.user.id,
                    },
                },
                include: [
                    {
                        association: 'creator',
                        attributes: ['name', 'id']
                    }
                ]
            })
            res.json(courses)
        } catch (error) {
            console.log(error)
        }
    }

    static async getUsersCourse(req: Request, res: Response) {
        try {
            const users = await Course.findOne({
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
            })


            res.json(users)

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error al obtener el curso' })
        }
    }
}