import { Request, Response } from "express";
import Note, { INote } from "../models/Note";
import { Types } from "mongoose";

type NoteParams = {
  noteId: Types.ObjectId;
};

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
      const notes = await Note.findOne({ task: req.task.id });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteNote = async (req: Request<NoteParams>, res: Response) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      const error = new Error("Nota no encontrada");
      res.status(404).json({ error: error.message });
      return;
    }

    if (note.createdBy.toString() !== req.user.id) {
      const error = new Error("No tienes permiso para eliminar esta nota");
      res.status(404).json({ error: error.message });
      return;
    }

    req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())

    try {
        await Promise.all([note.deleteOne(), req.task.save()])
        res.send('Nota eliminada')
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
