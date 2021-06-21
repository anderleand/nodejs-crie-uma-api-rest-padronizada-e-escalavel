const roteador = require('express').Router();
// const { JSON } = require('sequelize/types');
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
  const result = await TabelaFornecedor.listar();
  // eslint-disable-next-line no-console
  console.log('acessando router');
  res.send(JSON.stringify(result));
});

roteador.post('/', async (req, res) => {
  const dadosRecebidos = req.body;
  const fornecedor = new Fornecedor(dadosRecebidos);
  await fornecedor.criar();
  res.send(JSON.stringify(fornecedor));
});

roteador.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    res.send(JSON.stringify(fornecedor));
  } catch (erro) {
    res.send(JSON.stringify({
      mensagem: erro.message,
    }));
  }
});

roteador.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dadosRecebidos = req.body;
    const dados = { ...dadosRecebidos, id };
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.send(JSON.stringify({
      mensagem: 'Atualizado com sucesso.',
    }));
  } catch (erro) {
    res.send(JSON.stringify({
      mensagem: erro.message,
    }));
  }
});

module.exports = roteador;
