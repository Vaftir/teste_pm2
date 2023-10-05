const express = require("express");
const { connectToHomeDatabase, query } = require("../db/db.js"); // Importe a função query

const totvsRouter = express.Router();

totvsRouter.post("/create", async (req, res) => {
  const values = {
    cod_tovts: req.body.cod_tovts,
    nome: req.body.nome,
    tipo: req.body.tipo,
  };

  const sql = "INSERT INTO tovts SET ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({ id: result.insertId, message: "TOVTS criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar material");
  }
});

totvsRouter.get("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("Informe o cod do TOVTS");
  const sql = "SELECT * FROM tovts WHERE cod_tovts = ?";

  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, req.params.id); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    if (result.length === 0) {
      res.status(404).send("TOVTS não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

totvsRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM tovts";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

// Outras rotas com operações assíncronas aqui...

module.exports = totvsRouter;
