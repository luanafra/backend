let tarefas = [];

function listar() {
  return tarefas;
}

function criar(tarefa) {
  tarefas.push(tarefa);
  return tarefa;
}

function buscarPeloId(id) {
  return tarefas.find(t => t.id === id) || null;
}

function atualizar(id, dados) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return null;
  tarefas[index] = { ...tarefas[index], ...dados };
  return tarefas[index];
}

function remover(id) {
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return false;
  tarefas.splice(index, 1);
  return true;
}

module.exports = { listar, criar, buscarPeloId, atualizar, remover };
