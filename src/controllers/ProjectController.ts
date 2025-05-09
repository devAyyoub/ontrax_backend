import type { Request, Response } from "express";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    res.send('All the projects')
  };
  static createProject = async (req: Request, res: Response) => {
    res.send('Creating project...')
  };
}
