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
      const error = new Error("Project not found");
      res.status(404).json({ error: error.message });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    error = new Error("Error interno al comprobar si el proyecto existe");
    res.status(500).json({ error: error.message });
  }
}
