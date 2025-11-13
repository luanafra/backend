const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const apidocsRouter = require('./routes/apidocsRouter');
const produtosRouter = require('./routes/produtosRouter');



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', apidocsRouter);
app.use('/produtos', produtosRouter);



// Rotas básicas de teste (você pode remover depois)
app.get('/', (req, res) => {
  res.json({ mensagem: 'API Prática 9 funcionando!' });
});

module.exports = app;
