const express = require("express");
const { connectToHomeDatabase, query } = require("../db/db.js"); // Importe a função query

const equipeRouter = express.Router();

equipeRouter.post("/create", async (req, res) => {
  const values = {
    idequipe: req.body.idequipe,
    placa_veiculo: req.body.placa_veiculo,
    tipo_veiculo: req.body.tipo_veiculo,
  };

  const sql = "INSERT INTO equipe SET ?";
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, values);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json({ id: result.insertId, message: "Equipe criada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar equipe");
  }
});

equipeRouter.get("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("Informe o id da equipe");
  const sql = "SELECT * FROM equipe WHERE idequipe = ?";
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, req.params.id);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.length === 0) {
      res.status(404).send("Equipe não encontrada");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

equipeRouter.get("/", async (req, res) => {
  sql = "SELECT * FROM equipe";
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

equipeRouter.put("/update/:id", async (req, res) => {
  const values = [req.body.placa_veiculo, req.body.tipo_veiculo, req.params.id];
  const sql =
    "UPDATE equipe SET placa_veiculo = ?, tipo_veiculo = ? WHERE idequipe = ?";
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, values);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json({ id: result.insertId, message: "Equipe atualizada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar equipe");
  }
});

equipeRouter.delete("/delete/:id", async (req, res) => {
  if (!req.params.id)
    return res.status(400).send("Informe o id da equipe a ser excluída");

  const sql = "DELETE FROM equipe WHERE idequipe = ?";
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, req.params.id);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.affectedRows === 0) {
      res.status(404).send("Equipe não encontrada para exclusão");
    } else {
      res.status(200).send("Equipe excluída com sucesso");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir a equipe");
  }
});

equipeRouter.get("/tipo/:tipo", async (req, res) => {
  if (!req.params.tipo) return res.status(400).send("Informe o nome do equipe");

  const partialTipo = `%${req.params.tipo}%`; // Adicione '%' para correspondência parcial

  const sql = "SELECT * FROM equipe WHERE tipo_veiculo LIKE ?";

  try {
    const connection = await connectToDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql, partialTipo);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.length === 0) {
      res.status(404).send("equipe não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

module.exports = equipeRouter;
