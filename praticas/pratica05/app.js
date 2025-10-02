const express = require('express');
const tarefaRouter = require('./routes/tarefaRouter');

const app = express();

app.use(express.json()); // para entender JSON no corpo das requisições

// Middleware da rota /tarefas
app.use('/tarefas', tarefaRouter);

module.exports = app;
