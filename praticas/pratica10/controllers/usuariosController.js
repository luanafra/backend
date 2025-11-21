const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { gerarToken } = require("../middlewares/authMiddleware");


async function criar(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }

  const hash = bcrypt.hashSync(senha, 10);

  const novo = await Usuario.create({ email, senha: hash });

  res.status(201).json(novo);
}


async function entrar(req, res) {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const user = await Usuario.findOne({ email: usuario });

  if (!user) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const ok = bcrypt.compareSync(senha, user.senha);

  if (!ok) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const token = gerarToken({ email: user.email, id: user._id });

  res.json({ token });
}


async function renovar(req, res) {
  const novoToken = gerarToken({id: req.usuario.id,});
  res.json({ token: novoToken });
}


async function remover(req, res) {
  const id = req.params.id;

  await Usuario.findByIdAndDelete(id);

  res.status(204).send();
}

module.exports = {
  criar,
  entrar,
  renovar,
  remover,
};
