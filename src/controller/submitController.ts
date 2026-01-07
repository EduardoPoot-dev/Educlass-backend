import { Request, Response } from 'express';
import { Submit } from '../models/Submit';
import { File } from '../models/File';
import { User } from '../models/User';

export class SubmitController {
    static async submitTask(req: Request, res: Response) {
        
        try {
            
            const submit = new Submit({
                taskId: req.params.taskId,
                userId: req.user.id,
                courseId: req.course.id,
            })

            await submit.save()

            if(req.body.files.length > 0) {
                req.body.files.forEach( async (file: string) => {
                    const newFile = new File({url: file, submitId: submit.id});

                    await newFile.save();

                    await Promise.all([
                        submit.$add('files', newFile.id),
                        req.course.$add('submits', submit.id)
                    ])
                })
            }
            
            
            res.status(201).json('Tarea enviada correctamente');
        } catch (error) {
            console.error('Error al enviar la tarea:', error);
            res.status(500).json({ message: 'Error al enviar la tarea' });
        }
    }

    static async getTaskSubmissions(req: Request, res: Response) {
        try {
            const submissions = await Submit.findAll({
                where: { taskId: req.params.taskId },
                attributes: [],
                include: ['files', 'user'],
            });

            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            res.status(500).json({ message: 'Error fetching submissions' });
        }
    }

    static async getSubmission(req: Request, res: Response) {
        try {

            const submission = await Submit.findOne({
                where: {
                    taskId: req.task.id,
                    userId: req.user.id
                },
                attributes: [],
                include: [
                  {
                    association: 'user',
                    attributes: ['name', 'id']
                  },
                  {
                    association: 'course',
                    attributes: ['name', 'id']
                  },
                  {
                    association: 'files',
                    attributes: ['url']
                  },
                ]
            })

            if(!submission) {
                res.status(404).json({error: 'No se ha hecho ninguna entrega aún'})
                return
            }

            res.json(submission)
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al presentar la entrega'})
        }
    }

    static async getSubmitsCourse(req: Request, res: Response) {
        try {
            const submits = await Submit.findAll({
                where: {
                    courseId: req.course.id,
                    userId: req.user.id
                },
                attributes: ['id']
            })

            res.json(submits)
        } catch (error) {
            console.log(error)
        }
    } 

    
}