import { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([req.project.save(), task.save()]);
      res.send("Tarea creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTasks = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const tasks = await Task.find({project: req.project.id}).populate('project')
      res.json(tasks)
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(req.params.taskId).populate('project')
      if(!task) {
        res.status(404).json({error: 'Tarea no encontrada'})
        return
      }      
      if(task.project.id !== req.project.id) {
        res.status(400).json({error: 'Acción no válida'})
        return
      }
      res.json(task)
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }

  
}
