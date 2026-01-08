"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitController = void 0;
const Submit_1 = require("../models/Submit");
const File_1 = require("../models/File");
class SubmitController {
    static async submitTask(req, res) {
        try {
            const submit = new Submit_1.Submit({
                taskId: req.params.taskId,
                userId: req.user.id,
                courseId: req.course.id,
            });
            await submit.save();
            if (req.body.files.length > 0) {
                req.body.files.forEach(async (file) => {
                    const newFile = new File_1.File({ url: file, submitId: submit.id });
                    await newFile.save();
                    await Promise.all([
                        submit.$add('files', newFile.id),
                        req.course.$add('submits', submit.id)
                    ]);
                });
            }
            res.status(201).json('Tarea enviada correctamente');
        }
        catch (error) {
            console.error('Error al enviar la tarea:', error);
            res.status(500).json({ message: 'Error al enviar la tarea' });
        }
    }
    static async getTaskSubmissions(req, res) {
        try {
            const submissions = await Submit_1.Submit.findAll({
                where: { taskId: req.params.taskId },
                attributes: [],
                include: ['files', 'user'],
            });
            res.status(200).json(submissions);
        }
        catch (error) {
            console.error('Error fetching submissions:', error);
            res.status(500).json({ message: 'Error fetching submissions' });
        }
    }
    static async getSubmission(req, res) {
        try {
            const submission = await Submit_1.Submit.findOne({
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
            });
            if (!submission) {
                res.status(404).json({ error: 'No se ha hecho ninguna entrega aún' });
                return;
            }
            res.json(submission);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al presentar la entrega' });
        }
    }
    static async getSubmitsCourse(req, res) {
        try {
            const submits = await Submit_1.Submit.findAll({
                where: {
                    courseId: req.course.id,
                    userId: req.user.id
                },
                attributes: ['id']
            });
            res.json(submits);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.SubmitController = SubmitController;
//# sourceMappingURL=submitController.js.map