const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const tarefas = tarefaModel.listar();
  res.json(tarefas);
}

function criar(req, res) {
  const novaTarefa = {
    id: Math.random().toString(36).substring(2, 6),
    ...req.body,
  };
  const tarefa = tarefaModel.criar(novaTarefa);
  res.status(201).json(tarefa);
}

function buscarPeloId(req, res) {
  const tarefa = tarefaModel.buscarPeloId(req.params.tarefaId);
  if (!tarefa) return res.status(404).json({ msg: 'Tarefa não encontrada' });
  res.json(tarefa);
}

function atualizar(req, res) {
  const tarefa = tarefaModel.atualizar(req.params.tarefaId, req.body);
  if (!tarefa) return res.status(404).json({ msg: 'Tarefa não encontrada' });
  res.json(tarefa);
}

function remover(req, res) {
  const sucesso = tarefaModel.remover(req.params.tarefaId);
  if (!sucesso) return res.status(404).json({ msg: 'Tarefa não encontrada' });
  res.status(204).send();
}

module.exports = { listar, criar, buscarPeloId, atualizar, remover };
