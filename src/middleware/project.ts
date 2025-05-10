import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function validateProjectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      res.status(404).json({ error: "Proyecto no encontrado" });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
