const express = require("express");
const { connectToHomeDatabase, query } = require("../db/db.js"); // Importe a função query

const fornecedorRouter = express.Router();

fornecedorRouter.post("/create", async (req, res) => {
  const values = {
    cnpj: req.body.cnpj,
    nome: req.body.nome,
  };

  const sql = "INSERT INTO fornecedor SET ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({ id: result.insertId, message: "Fornecedor criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar fornecedor");
  }
});

fornecedorRouter.get("/:id", async (req, res) => {
  if (!req.params.id)
    return res.status(400).send("Informe o CNPJ do fornecedor");
  const sql = "SELECT * FROM fornecedor WHERE cnpj = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, req.params.id); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    if (result.length === 0) {
      res.status(404).send("Fornecedor não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

fornecedorRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM fornecedor";
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

fornecedorRouter.put("/update/:id", async (req, res) => {
  const values = [req.body.nome, req.params.id];
  const sql = "UPDATE fornecedor SET nome = ? WHERE cnpj = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({
      id: result.insertId,
      message: "Fornecedor atualizado com sucesso",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar fornecedor");
  }
});

fornecedorRouter.delete("/delete/:id", async (req, res) => {
  if (!req.params.id)
    return res.status(400).send("Informe o CNPJ do fornecedor a ser excluído");

  const sql = "DELETE FROM fornecedor WHERE cnpj = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, req.params.id); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    if (result.affectedRows === 0) {
      res.status(404).send("Fornecedor não encontrado para exclusão");
    } else {
      res.status(200).send("Fornecedor excluído com sucesso");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir o fornecedor");
  }
});

module.exports = fornecedorRouter;
