import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const whitelist = [process.env.FRONTEND_URL];

    // Allow calls without origin (for example: curl, Postman)
    if (process.argv[2] === "--api") {
      if (!origin) return callback(null, true);
    }

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
