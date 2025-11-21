const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "segredo_teste";
const EXPIRES = process.env.JWT_EXPIRES || "1h";

function gerarToken(payload) {
  try {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
  } catch (err) {
    throw new Error("Erro ao gerar o token");
  }
}

function verificarToken(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) return res.status(401).json({ msg: "Token inválido" });

  const [bearer, token] = header.split(" ");

  if (bearer !== "Bearer" || !token)
    return res.status(401).json({ msg: "Token inválido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

module.exports = { gerarToken, verificarToken };
