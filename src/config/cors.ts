import cors, { CorsOptions } from "cors";

// 🔓 CORS temporalmente abierto a todos los orígenes
export const corsConfig: CorsOptions = {
  origin: true,
};

/*
export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const whitelist = [process.env.FRONTEND_URL];

    // Allow calls without origin (for example: curl, Postman)
    if (!origin) return callback(null, true);

    const isAllowed = whitelist.some(allowedOrigin =>
      origin.toLowerCase().startsWith(allowedOrigin?.toLowerCase() || '')
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`Origin bloqueado por CORS: ${origin}`);
      callback(new Error("Error de CORS"));
    }
  },
};
*/