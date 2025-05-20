import { Request, Response } from "express";
import Project from "../models/Project";
import User from "../models/User";

export class TeamMemberController {
  static findMemberByEmail = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
        const {email} = req.body
        const user = await User.findOne({email}).select('id email name')
        if (!user) {
            const error = new Error('Usuario no encontrado')
            res.status(404).json({error: error.message})
            return
        }
        res.json(user)
    } catch (error) {   
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
