import cors from "cors";

export default function configureCors(app) {
  const allowedOrigin = process.env.FRONTEND_URI || "http://localhost:5173";
  app.use(cors({
    origin: allowedOrigin,
    credentials: true,
  }));
}
