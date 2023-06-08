const jwt = require("jsonwebtoken");

const autenticacao = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send();
    const token = req.headers.authorization.split(" ")[1]; 
    const payload = jwt.verify(token, process.env.SECRET);
    req.usuarioId = payload.usuarioId;
    next();
  } catch (error) {
    return res.status(401).send();
  }
};

module.exports = autenticacao;