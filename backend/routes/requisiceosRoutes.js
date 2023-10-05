const express = require("express");
const { connectToHomeDatabase, query } = require("../db/db.js"); // Importe a função query

const requisicoesRouter = express.Router();

requisicoesRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM requisicao";
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

requisicoesRouter.get("/:id", async (req, res) => {
  const sql = "SELECT * FROM requisicao WHERE idrequisicao = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, req.params.id); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    if (result.length === 0) {
      res.status(404).send("Requisicao não encontrada");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

requisicoesRouter.post("/create", async (req, res) => {
  const values = [
    req.body.data_criacao,
    req.body.data_prevista,
    req.body.data_retirada,
    req.body.status,
    req.body.tipo,
    req.body.user_matricula,
    req.body.equipe_idequipe,
    req.body.eletricista_matricula,
    req.body.eletricista_nome,
    req.body.numero_bo,
  ];

  const sql = "INSERT INTO requisicao SET ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({ id: result.insertId, message: "Requisicao criada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar requisicao");
  }
});

requisicoesRouter.put("/update/:id", async (req, res) => {
  const values = [
    req.body.data_criacao,
    req.body.data_prevista,
    req.body.data_retirada,
    req.body.status,
    req.body.tipo,
    req.body.user_matricula,
    req.body.equipe_idequipe,
    req.body.eletricista_matricula,
    req.body.eletricista_nome,
    req.body.numero_bo,
    req.params.id,
  ];

  const sql =
    "UPDATE requisicao SET data_criacao = ?, data_prevista = ?, data_retirada = ?, status = ?, tipo = ?, user_matricula = ?, equipe_idequipe = ?, eletricista_matricula = ?, eletricista_nome = ?, numero_bo = ? WHERE idrequisicao = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({
      id: result.insertId,
      message: "Requisicao atualizada com sucesso",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar requisicao");
  }
});

requisicoesRouter.delete("/delete/:id", async (req, res) => {
  const values = req.params.id;
  const sql = "DELETE FROM requisicao WHERE idrequisicao = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({
      id: result.insertId,
      message: "Requisicao deletada com sucesso",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar requisicao");
  }
});

module.exports = requisicoesRouter;
