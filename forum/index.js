import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//changes routes to router
import forumRouter from './routes/forum.js';

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/forum', forumRouter);

//const { application } = require("express");
//const { default: mongoose } = require("mongoose");

// old version
    const CONNECTION_URL = 'mongodb+srv://jeanr:Cheese1818!@cluster0.olsuuej.mongodb.net/?retryWrites=true&w=majority'; 
    const PORT = process.env.PORT || 5000;

    mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log('Server running on port: http://localhost:${PORT}')))
        .catch(() =>(error) => console.log('${error} did not connect'));

    //mongoose.set('useFindAndModify', false);


/*
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Forum server running on port: ${PORT}`)))
    .catch(() => (error) => console.log(`${error} did not connect`));
*/
