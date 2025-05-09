import { Request, Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";

export class TaskController {
  static createTask = async (req: Request, res: Response): Promise<void> => {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      const error = new Error("Proyecto no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    try {
        const task = new Task(req.body)
        task.project = project.id
        project.tasks.push(task.id)
        await project.save()
        await task.save()
        res.send('Tarea creada correctamente')
    } catch (error) {
      console.log(error);
    }
  };
}
