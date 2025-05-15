import express, { Request, Response } from "express";
import dotenv from "dotenv";
// import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://zblteq:ribound@flin-test.l7k8h3c.mongodb.net/?retryWrites=true&w=majority&appName=flin-test";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success", message: "Server is running" });
});

app.get("/ping", (req: Request, res: Response) => {
  res.json({ status: "success", message: "pong" });
});

app.post("/leads", async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, email, loanType } = req.body;

    const lead = {
      name,
      phoneNumber,
      email,
      loanType,
      createdAt: new Date(),
    };

    const db = client.db("flin-test");
    const result = await db.collection("leads").insertOne(lead);

    res.status(201).json({
      status: "success",
      data: { id: result.insertedId, ...lead },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create lead",
    });
  }
});

async function startServer() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
