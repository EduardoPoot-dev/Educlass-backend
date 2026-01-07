import { Request, Response } from 'express';
import { Task } from '../models/Task';
import formidable from 'formidable';
import { uploadFile } from '../config/cloudinary';

export class TaskController {
    static async newTask(req: Request, res: Response) {
        try {
            const newTask = new Task(req.body);

            newTask.creatorId = req.user.id;
            newTask.courseId = req.params.courseId;

            // Validar que la fecha de vencimiento sea una fecha futura
            if (new Date(newTask.dueDate) <= new Date()) {
               res.status(400).json({ error: 'La fecha de vencimiento debe ser una fecha futura' });
                return
            }

            await newTask.save()

            res.json('Tarea creado correctamente');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al crear la tarea' });
        }
    }

    static async getTasks(req: Request, res: Response) {
        try {
            res.json(req.course.tasks)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener las tareas' });
            
        }
    }

    static async getTask(req: Request, res: Response) {
        try {
            res.json(req.task);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener la tarea' });
        }
    }

    static async uploadFiles(req: Request, res: Response) {
        try {
            const form = formidable();

            const [, fields] = await form.parse(req)
            
            if(!fields.files.length) {
                res.status(400).json({ error: 'No se ha proporcionado un archivo' });
                return;
            }

            const arePdf = fields.files.every((file: formidable.File) => file.mimetype.includes('application/pdf'));
            if(!arePdf) {
                res.status(400).json({ error: 'Solo se permiten archivos PDF' });
                return;
            }

            const areSizeMin15Mb = fields.files.every((file: formidable.File) => file.size <= 15 * 1024 * 1024);
            if(!areSizeMin15Mb) {
                res.status(400).json({ error: 'El archivo no debe pesar más de 15MB' }); 
                return;
            }

            let images: string[] = [];
            for (const file of fields.files) {
                const result = await uploadFile(file.filepath, file.originalFilename);
                images.push(result.secure_url);
            }
            //originalFilename
            res.json(images)

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al subir el archivo' });
            
        }
    }

}