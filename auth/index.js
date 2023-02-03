import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

// Initialize app with express
const app = express();

// Need to create your own .env file for port and mongoose connection url
// See .env.example
dotenv.config();

// Connect to mongoose atlas for database
const PORT = process.env.PORT;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, console.log(`Authentication server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

