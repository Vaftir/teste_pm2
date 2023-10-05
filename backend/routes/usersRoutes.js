const express = require("express");
const { connectToHomeDatabase, query } = require("../db/db.js"); // Importe a função query

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const sql = "SELECT * FROM user";
    const result = await query(connection, sql);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

userRouter.get("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("Informe o id do usuário");
  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const sql = "SELECT * FROM user WHERE matricula = ?";
    const result = await query(connection, sql, req.params.id);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

userRouter.post("/create", async (req, res) => {
  console.log("req.body: ", req.body);
  const values = [
    req.body.username,
    req.body.matricula,
    req.body.password,
    req.body.create_time,
    req.body.cargo,
    req.body.e_um_fornecedor,
    req.body.e_um_almoxarife,
    req.body.equipe_idequipe,
    req.body.base,
    res.body.e_um_auxiliar,
  ];
  // TODO: MANDAR O GPT ADD AQUI BASE E AUXILIAR
  const sql =
    "INSERT INTO user (username, matricula, password, create_time, cargo, e_um_fornecedor, e_um_almoxarife, equipe_idequipe) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, values);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar usuário");
  }
});

userRouter.put("/update/:id", async (req, res) => {
  console.log("req.body: ", req.body);
  const values = [
    req.body.username,
    req.body.cargo,
    req.body.create_time,
    req.params.id,
  ];

  const sql =
    "UPDATE user SET username = ?, cargo = ?, create_time = ? WHERE matricula = ?";

  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, values);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar usuário");
  }
});

userRouter.get("/name/:name", async (req, res) => {
  if (!req.params.name) return res.status(400).send("Informe o nome do user");

  const partialName = `%${req.params.name}%`; // Adicione '%' para correspondência parcial

  const sql = "SELECT * FROM user WHERE nome LIKE ?";

  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados

    const result = await query(connection, sql, partialName);

    // Feche a conexão quando não for mais necessária
    connection.end();

    if (result.length === 0) {
      res.status(404).send("user não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  console.log("req.body: ", req.body);
  const values = req.params.id;

  const sql = "DELETE FROM user WHERE matricula = ?";

  try {
    // Conecte-se ao banco de dados
    const connection = await connectToHomeDatabase();

    const result = await query(connection, sql, values);

    // Feche a conexão quando não for mais necessária
    connection.end();

    res.json({ id: result.deleteId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar usuário");
  }
});

module.exports = userRouter;
