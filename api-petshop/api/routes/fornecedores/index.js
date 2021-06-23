const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

// Listar todos
roteador.get('/', async (req, res) => {
  const result = await TabelaFornecedor.listar();
  res.status(200);
  res.send(JSON.stringify(result));
});

// Criar
roteador.post('/', async (req, res, next) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    res.status(201);
    res.send(JSON.stringify(fornecedor));
  } catch (erro) {
    next(erro);
  }
});

// Listar por id
roteador.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    res.status(200);
    res.send(JSON.stringify(fornecedor));
  } catch (erro) {
    next(erro);
  }
});

// Atualizar
roteador.put('/:id', async (req, res, next) => {
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
    next(erro);
  }
});

// Deletar
roteador.delete('/:id', async (req, res, next) => {
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
    next(erro);
  }
});

module.exports = roteador;
