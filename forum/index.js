import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import forumRoutes from './routes/forum.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.use('/forum', forumRoutes);

//const { application } = require("express");
//const { default: mongoose } = require("mongoose");

const CONNECTION_URL = 'mongodb+srv://jeanr:Cheese1818!@cluster0.olsuuej.mongodb.net/?retryWrites=true&w=majority'; 
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port: http://localhost:${PORT}')))
    .catch(() =>(error) => console.log('${error} did not connect'));

//mongoose.set('useFindAndModify', false);