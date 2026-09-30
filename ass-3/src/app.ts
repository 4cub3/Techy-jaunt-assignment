import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import morgan from "morgan";
import { CONFIGS } from "./config/config.ts";
import connectDb from "./config/db.ts";
import authRoutes from "./routes/auth.route.ts";
import profileRoutes from "./routes/profile.route.ts";
import { ROOT_ROUTE } from "./types/routes.types.ts";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use(ROOT_ROUTE.AUTH, authRoutes);
app.use(ROOT_ROUTE.USER, profileRoutes);

//catch all routes
app.use((_req, res, next) => {
  res.send("Event management app is working");
  next();
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

connectDb().then(() => {
  app.listen(CONFIGS.port, () => {
    console.log(`app is running on port:${CONFIGS.port}`);
  });
});
