/* eslint-disable no-unused-vars */
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { registerValidation } from "./validations/auth.js";

import { validationResult } from "express-validator";

import User from "./models/User.js";

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

// Тестовый маршрут
app.get("/", (req, res) => {
  res.send("API is running!");
});

app.post("/auth/register", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new User({
    email: req.body.email,
    username: req.body.username,
    passwordHash,
  });

  const user = await doc.save();

  res.json({ success: true });
});

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server is RUNNING");
});
