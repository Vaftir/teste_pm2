const express = require("express");
const { connectToHomeDatabase, query } = require("../db/db.js"); // Importe a função query

const materialRouter = express.Router();

materialRouter.post("/create", async (req, res) => {
  const values = {
    requisicao_idrequisicao: req.body.requisicao_idrequisicao,
    serie_laudo: req.body.serie_laudo,
    nome_eletricista: req.body.nome_eletricista,
    mat_eletricista: req.body.mat_eletricista,
    vencimento_laudo: req.body.vencimento_laudo,
    data_devolucao: req.body.data_devolucao,
    emprestado: req.body.emprestado,
    em_estoque: req.body.em_estoque,
    em_refugo: req.body.em_refugo,
    em_uso: req.body.em_uso,
    tipo_epi_epc: req.body.tipo_epi_epc,
    TOVTs_cod_tovts: req.body.TOVTs_cod_tovts,
    fornecedor_cnpj: req.body.fornecedor_cnpj,
    equipe_idequipe: req.body.equipe_idequipe,
  };

  const sql = "INSERT INTO material SET ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({ id: result.insertId, message: "Material criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar material");
  }
});

materialRouter.get("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("Informe o id do material");
  const sql = "SELECT * FROM material WHERE serie_laudo = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, req.params.id); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    if (result.length === 0) {
      res.status(404).send("Material não encontrado");
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

materialRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM material";
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

materialRouter.put("/update/:id", async (req, res) => {
  const values = [
    req.body.serie_laudo,
    req.body.nome_eletricista,
    req.body.mat_eletricista,
    req.body.vencimento_laudo,
    req.body.data_devolucao,
    req.body.emprestado,
    req.body.em_estoque,
    req.body.em_refugo,
    req.body.em_uso,
    req.body.tipo_epi_epc,
    req.body.TOVTs_cod_tovts,
    req.body.fornecedor_cnpj,
    req.body.equipe_idequipe,
    req.params.id,
  ];

  const sql =
    "UPDATE material SET serie_laudo = ?, nome_eletricista = ?, mat_eletricista = ?, vencimento_laudo = ?, data_devolucao = ?, emprestado = ?, em_estoque = ?, em_refugo = ?, em_uso = ?, tipo_epi_epc = ?, TOVTs_cod_tovts = ?, fornecedor_cnpj = ?, equipe_idequipe = ? WHERE serie_laudo = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, values); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    res.json({
      id: result.insertId,
      message: "Material atualizado com sucesso",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar material");
  }
});

materialRouter.delete("/delete/:id", async (req, res) => {
  if (!req.params.id)
    return res.status(400).send("Informe o id do material a ser excluído");

  const sql = "DELETE FROM material WHERE serie_laudo = ?";
  try {
    const connection = await connectToHomeDatabase(); // Conecte-se ao banco de dados
    const result = await query(connection, sql, req.params.id); // Use a função query do db.js
    connection.end(); // Feche a conexão quando não for mais necessária

    if (result.affectedRows === 0) {
      res.status(404).send("Material não encontrado para exclusão");
    } else {
      res.status(200).send("Material excluído com sucesso");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir o material");
  }
});

module.exports = materialRouter;
