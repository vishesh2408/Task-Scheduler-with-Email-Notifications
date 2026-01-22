import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import express from "express";
import exampleRoutes from "./routes/exampleRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import configureCors from "./config/cors.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// Start the scheduler for email reminders
import "./controllers/scheduler.js";


const app = express();
const PORT = process.env.PORT || 5000;
configureCors(app);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api", exampleRoutes);
app.use("/api", taskRoutes);
app.use("/api", notificationRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
