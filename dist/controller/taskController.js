"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const Task_1 = require("../models/Task");
const formidable_1 = __importDefault(require("formidable"));
const cloudinary_1 = require("../config/cloudinary");
class TaskController {
    static async newTask(req, res) {
        try {
            const newTask = new Task_1.Task(req.body);
            newTask.creatorId = req.user.id;
            newTask.courseId = req.params.courseId;
            // Validar que la fecha de vencimiento sea una fecha futura
            if (new Date(newTask.dueDate) <= new Date()) {
                res.status(400).json({ error: 'La fecha de vencimiento debe ser una fecha futura' });
                return;
            }
            await newTask.save();
            res.json('Tarea creado correctamente');
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al crear la tarea' });
        }
    }
    static async getTasks(req, res) {
        try {
            res.json(req.course.tasks);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener las tareas' });
        }
    }
    static async getTask(req, res) {
        try {
            res.json(req.task);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al obtener la tarea' });
        }
    }
    static async uploadFiles(req, res) {
        try {
            const form = (0, formidable_1.default)();
            const [, fields] = await form.parse(req);
            if (!fields.files.length) {
                res.status(400).json({ error: 'No se ha proporcionado un archivo' });
                return;
            }
            const arePdf = fields.files.every((file) => file.mimetype.includes('application/pdf'));
            if (!arePdf) {
                res.status(400).json({ error: 'Solo se permiten archivos PDF' });
                return;
            }
            const areSizeMin15Mb = fields.files.every((file) => file.size <= 15 * 1024 * 1024);
            if (!areSizeMin15Mb) {
                res.status(400).json({ error: 'El archivo no debe pesar más de 15MB' });
                return;
            }
            let images = [];
            for (const file of fields.files) {
                const result = await (0, cloudinary_1.uploadFile)(file.filepath, file.originalFilename);
                images.push(result.secure_url);
            }
            //originalFilename
            res.json(images);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error al subir el archivo' });
        }
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=taskController.js.map