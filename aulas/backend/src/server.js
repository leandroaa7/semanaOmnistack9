const express = require('express');
const routes = require('./routes');

const mongoose = require('mongoose');

const path = require('path');

const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app)
const io = socketio(server);

//database
const databaseName = "semana09";
const connectionString = "mongodb+srv://omnistack:omnistack@cluster0-pligr.mongodb.net/" + databaseName + "?retryWrites=true&w=majority"
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(connectionString, connectionParams)

//const corsParams = {origin: 'http://localhost:3333'}
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads")));

const connectedUsers = {}

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

//salvando o io no request como middleware
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

app.use(routes);

server.listen(3333);