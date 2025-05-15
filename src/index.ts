import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import leadRoutes from "./routes/leadRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success", message: "Server is running" });
});

app.get("/ping", (req: Request, res: Response) => {
  res.json({ status: "success", message: "pong" });
});

app.use("/leads", leadRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
