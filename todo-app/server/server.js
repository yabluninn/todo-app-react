/* eslint-disable no-unused-vars */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

import { registerValidation } from "./validations/auth.js";

import { validationResult } from "express-validator";

import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import taskListsRoutes from "./routes/taskLists.js";
import noteListRoutes from "./routes/noteLists.js";
import tasksRoutes from "./routes/tasks.js";

mongoose
  .connect(
    "mongodb+srv://admin:adminBooxee@maincluster.zymiq.mongodb.net/booxee?retryWrites=true&w=majority&appName=MainCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.log("Error connection to MongoDB: ", err);
  });

const app = express();

app.use(express.json());
app.use(cors());

// Подключение маршрутов
app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/taskLists", taskListsRoutes);
app.use("/api/noteLists", noteListRoutes);
app.use("/api/tasks", tasksRoutes);

// Тестовый маршрут
app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is RUNNING");
});
