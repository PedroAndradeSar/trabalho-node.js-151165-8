const express = require('express');
const healthRoutes = require('./routes/health');
const receitasRoutes = require('./routes/receitas');
const usersRoutes = require('./routes/usuario');
const server = express();

server.use(express.json());

server.use(healthRoutes.router);

server.use(receitasRoutes.router);

server.use(usersRoutes.router);

module.exports = { 
    server 
};