import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import menusRoutes from "./routes/menus.routes";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:9000",
  methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(corsOptions));

app.use("/api/v1/menus", menusRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not Found" });
});

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
