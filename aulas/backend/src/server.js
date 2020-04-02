const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//database
const databaseName = "semana09";
const connectionString = "mongodb+srv://omnistack:omnistack@cluster0-pligr.mongodb.net/" + databaseName + "?retryWrites=true&w=majority"
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(connectionString, connectionParams)

app.use(express.json());
app.use(routes);

app.listen(3333);