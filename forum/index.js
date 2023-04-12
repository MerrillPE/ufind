import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//changes routes to router
import forumRouter from './routes/forum.js';

const app = express();
dotenv.config();

// higher limit for image files
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/forum', forumRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
//const CONNECTION_URL = 'mongodb://forum_db:27017/forumdb';
const PORT = process.env.PORT;

mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Forum server running on port: ${PORT}`)))
    .catch(() => (error) => console.log(`${error} did not connect`));

export default app;