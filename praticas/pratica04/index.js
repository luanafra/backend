const express = require('express');
const app = express();

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

module.exports = app;

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json(tarefas);
});
router.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

router.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  res.json(tarefa);
});

router.put('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  tarefa.nome = req.body.nome;
  tarefa.concluida = req.body.concluida;
  res.json(tarefa);
});

router.delete('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return next(new Error("Tarefa não localizada"));
  tarefas.splice(index, 1);
  res.status(204).send();
});

app.use('/tarefas', router);

app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });
  });
  