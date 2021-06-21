const express = require('express');

const app = express();
const bodyParser = require('body-parser');
// const config = require('config');

app.use(bodyParser.json());

const roteador = require('./routes/fornecedores');

app.use('/api/fornecedores', roteador);

// app.listen(config.get('api.port'), ()=> {
app.listen((3000), () => {
  // console.log(`API funcionando, escutando na porta ${config.get('api.port')}`)
  // eslint-disable-next-line no-console
  console.log('API funcionando, escutando na porta 3000');
});
