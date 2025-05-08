import mongoose, { Schema, Document, ProjectionType } from "mongoose";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
}

const projectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
});

const Project = mongoose.model<IProject>('Project', projectSchema)
export default Project
