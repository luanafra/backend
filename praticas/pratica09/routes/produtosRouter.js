const express = require('express');
const router = express.Router();

let produtos = [
  { id: 1, nome: 'Teclado', preco: 150.0 },
  { id: 2, nome: 'Mouse', preco: 90.0 }
];

router.get('/', (req, res) => {
  res.json(produtos);
});

router.get('/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId);
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  res.json(produto);
});

router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(422).json({ erro: 'Nome e preço são obrigatórios' });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

router.put('/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId);
  const { nome, preco } = req.body;

  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  if (!nome || preco == null) {
    return res.status(422).json({ erro: 'Nome e preço são obrigatórios' });
  }

  produto.nome = nome;
  produto.preco = preco;
  res.json(produto);
});

router.delete('/:produtoId', (req, res) => {
  const id = parseInt(req.params.produtoId);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produtos.splice(index, 1);
  res.status(204).send(); 
});

module.exports = router;
