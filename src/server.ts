import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsConfig));
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
console.log("Rutas /auth registradas");

export default app;
