const express = require("express");
const { connectToDatabase, query,connectToHomeDatabase } = require("../db/db.js"); // Importe a função query do seu arquivo db.js

const eletricistaRouter = express.Router();

eletricistaRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM eletricista";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

eletricistaRouter.get("/:matricula", async (req, res) => {
  if (!req.params.matricula)
    return res.status(400).send("Informe a matrícula do eletricista");
  const sql = "SELECT * FROM eletricista WHERE matricula = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql, req.params.matricula);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.length === 0) {
      res.status(404).send("Eletricista não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

eletricistaRouter.get("/name/:name", async (req, res) => {
  if (!req.params.name)
    return res.status(400).send("Informe o nome do eletricista");

  const partialName = `%${req.params.name}%`; // Adicione '%' para correspondência parcial

  const sql = "SELECT * FROM eletricista WHERE nome LIKE ?";

  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql, partialName);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.length === 0) {
      res.status(404).send("Eletricista não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

eletricistaRouter.get("/base/:base", async (req, res) => {
  if (!req.params.base)
    return res.status(400).send("Informe o nome do eletricista");

  const partialBase = `%${req.params.base}%`; // Adicione '%' para correspondência parcial

  const sql = "SELECT * FROM eletricista WHERE base LIKE ?";

  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql, partialBase);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.length === 0) {
      res.status(404).send("Eletricista não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

eletricistaRouter.post("/create", async (req, res) => {
  const values = {
    matricula: req.body.matricula,
    nome: req.body.nome,
    equipe_idequipe: req.body.equipe_idequipe,
    funcao: req.body.funcao,
    base: req.body.base,
  };

  const sql = "INSERT INTO eletricista SET ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql, values);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json({
      id: result.insertId,
      message: "Eletricista criado com sucesso!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar eletricista");
  }
});

module.exports = eletricistaRouter;
