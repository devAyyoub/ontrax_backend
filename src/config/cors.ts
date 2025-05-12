import cors, { CorsOptions } from "cors";

// Permitir conexiones
export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};