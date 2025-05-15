import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const task = await Task.findById(req.params.taskId.toString());

    if (!task) {
      res.status(404).json({ error: "Tarea no encontrada" });
      return;
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}

export async function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.task.project._id.toString() !== req.project.id.toString()) {
    res.status(400).json({ error: "No existe esa tarea en ese proyecto" });
    return;
  }
  next()
}
