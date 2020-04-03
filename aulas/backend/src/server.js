const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

//database
const databaseName = "semana09";
const connectionString = "mongodb+srv://omnistack:omnistack@cluster0-pligr.mongodb.net/" + databaseName + "?retryWrites=true&w=majority"
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(connectionString, connectionParams)

//const corsParams = {origin: 'http://localhost:3333'}
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);