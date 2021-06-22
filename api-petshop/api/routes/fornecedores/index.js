const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
  const result = await TabelaFornecedor.listar();
  res.status(200);
  res.send(JSON.stringify(result));
});

roteador.post('/', async (req, res) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    res.status(201);
    res.send(JSON.stringify(fornecedor));
  } catch (erro) {
    res.status(400);
    res.send(JSON.stringify({
      mensagem: erro.message,
    }));
  }
});

roteador.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    res.status(200);
    res.send(JSON.stringify(fornecedor));
  } catch (erro) {
    res.status(404);
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
    res.status(200);
    res.send(JSON.stringify({
      mensagem: 'Atualizado com sucesso.',
    }));
  } catch (erro) {
    res.status(400);
    res.send(JSON.stringify({
      mensagem: erro.message,
    }));
  }
});

roteador.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    await fornecedor.delete();
    res.status(200);
    res.send(JSON.stringify({
      mensagem: `Id ${id} removido com sucesso.`,
    }));
  } catch (erro) {
    res.status(404);
    res.send(JSON.stringify({
      mensagem: erro.message,
    }));
  }
});

module.exports = roteador;
