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
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(req.params.taskId).populate("project");
      if (!task) {
        res.status(404).json({ error: "Tarea no encontrada" });
        return;
      }
      if (
        !task.project ||
        task.project.id === null ||
        task.project.id !== req.project.id
      ) {
        res.status(400).json({ error: "No existe esa tarea en ese proyecto" });
        return;
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(
        req.params.taskId
      ).populate("project");
      if (!task) {
        res.status(404).json({ error: "Tarea no encontrada" });
        return;
      }
      if (
        !task.project ||
        task.project.id === null ||
        task.project.id !== req.project.id
      ) {
        res.status(400).json({ error: "No existe esa tarea en ese proyecto" });
        return;
      }
      task.name = req.body.name
      task.description = req.body.description
      task.save()
      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await Task.findById(req.params.taskId, req.body);
      if (!task) {
        res.status(404).json({ error: "Tarea no encontrada" });
        return;
      }
      // if (
      //   !task.project ||
      //   task.project.id === null ||
      //   task.project.id !== req.project.id
      // ) {
      //   res.status(400).json({ error: "No existe esa tarea en ese proyecto" });
      //   return;
      // }
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.params.taskId
      );

      await Promise.allSettled([task.deleteOne(), req.project.save()])
      res.send("Tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      console.log(error);
      
    }
  };
}
