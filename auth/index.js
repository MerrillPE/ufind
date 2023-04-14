import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";

import authRouter from './routes/auth.js'

// Initialize app with express
const app = express();


// Need to create your own .env file for port and mongoose connection url
// See .env.example
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/users', authRouter); // All auth requests start at /users

// Connect to mongoose atlas for database
const PORT = process.env.PORT;
mongoose.set('strictQuery', true);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, console.log(`Authentication server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

export default app;