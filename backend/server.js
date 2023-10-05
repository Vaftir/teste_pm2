
const express = require("express");
const cors = require("cors");
const os = require("os");

const server = express();

const port = process.env.PORT_SERVER || 8080;
const networkInterfaces = os.networkInterfaces();
const ipv4Address = networkInterfaces["eth0"][0].address; // Substitua "Ethernet" pelo nome da sua interface de rede

// Middleware para processar dados JSON
server.use(cors());
server.use(express.json());

// Rotas da sua aplicação
const usersRouter = require("./routes/usersRoutes.js");
const materialRouter = require("./routes/materialRoutes.js");
const fornecedorRouter = require("./routes/fornecedorRoutes.js");
const totvsRouter = require("./routes/totvsRoutes.js");
const equipeRouter = require("./routes/equipeRoutes.js");
const requisicoesRouter = require("./routes/requisiceosRoutes.js");
const eletricistaRouter = require("./routes/eletricistaRoutes.js");

// Use os roteadores na sua aplicação
server.use("/user", usersRouter);
server.use("/totvs", totvsRouter);
server.use("/equipe", equipeRouter);
server.use("/materials", materialRouter);
server.use("/fornecedor", fornecedorRouter);
server.use("/requisicao", requisicoesRouter);
server.use("/eletricista", eletricistaRouter);

// Rota para verificar o ID do processo
server.get("/", (req, res) => {
  const processId = 2;
  res.json({
    solicitacao: "Hello world!",
    processo: processId,
    mensage: "Oi eu sou o servidor! Provacelmente você está usando o cluster!",
    routes: [
      'http//'+ipv4Address+"/user",
      'http//'+ipv4Address+"/totvs",
      'http//'+ipv4Address+"/equipe",
      'http//'+ipv4Address+"/materials",
      'http//'+ipv4Address+"/fornecedor",
      'http//'+ipv4Address+"/requisicao",
      'http//'+ipv4Address+"/eletricista",
    ],
  });
  console.log(`Solicitação processada pelo processo ${processId}`);
});

// Inicie o servidor
server.listen(port, () => {
  console.log(`Servidor em execução na porta ${ipv4Address} ${port} `);
});
