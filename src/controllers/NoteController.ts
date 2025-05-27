import { Request, Response } from "express";
import Note, { INote } from "../models/Note";

export class NoteController {
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    const { content } = req.body;
    const note = new Note();
    note.createdBy = req.user.id;
    note.content = content;
    note.task = req.task.id;
    req.task.notes.push(note.id);
    try {
      await Promise.allSettled([note.save(), req.task.save()]);
      res.send("Nota creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskNotes = async (req: Request, res: Response) => {
    try {
      const notes = await Note.findOne({task: req.task.id})
      res.json(notes)
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
