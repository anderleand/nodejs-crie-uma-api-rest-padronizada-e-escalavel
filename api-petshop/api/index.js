const express = require('express');
const bodyParser = require('body-parser');
// const config = require('config');
const roteador = require('./routes/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const { formatosAceitos } = require('./Serializador');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  let formatoRequisitado = req.header('Accept');

  if (formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json';
  }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    res.status(406);
    res.end();
    return;
  }

  res.setHeader('Content-Type', formatoRequisitado);
  next();
});

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
  let status = 500;

  if (erro instanceof NaoEncontrado) {
    status = 404;
  }

  if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400;
  }

  if (erro instanceof ValorNaoSuportado) {
    status = 406;
  }

  res.status(status);
  res.send(JSON.stringify({
    mensagem: erro.message,
    id: erro.idErro,
  }));
});

// app.listen(config.get('api.port'), ()=> {
app.listen((3000), () => {
  // console.log(`API funcionando, escutando na porta ${config.get('api.port')}`)
  // eslint-disable-next-line no-console
  console.log('API funcionando, escutando na porta 3000');
});
