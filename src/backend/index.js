const config = require("./config.js");
const express = require("express");
const cors = require("cors");
const deviceRouter = require("./controllers/device.controller.js");

const PORT = config.API_PORT;
const corsOptions = { origin: "*", optionSucessStatus: 200 };
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("/home/node/app/static/"));
app.use("/device", deviceRouter);

app.all("*", (req, res) => {
  return res.status(404).json(`Ruta '${req.path}' no encontrada.`);
});

app.listen(PORT, (req, res) => {
  console.log(`NodeJS API running correctly on port ${PORT}`);
});
