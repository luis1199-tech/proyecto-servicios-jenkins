const express = require('express');//importacion de express
const { getconnection } = require('./database/db-connetion-mongo');//importacion de mongo
const cors = require ('cors');//importacion de cors para el uso de las apis

const app = express();
const port = 3000;

//const port = process.env.PORT;

//implementacion cors
app.use(cors());

getconnection();

//paseo json convierte a fromato json
app.use(express.json());

app.use('/clientes', require('./router/cliente'));
app.use('/tipo-proyecto', require('./router/tipoProyecto'));
app.use('/etapa', require('./router/etapa'));
app.use('/universidad', require('./router/universidad'));
app.use('/proyecto', require('./router/proyecto'));

  app.listen(port, () => {
    console.log(`conexion por el puerto ${port}`)
  });  