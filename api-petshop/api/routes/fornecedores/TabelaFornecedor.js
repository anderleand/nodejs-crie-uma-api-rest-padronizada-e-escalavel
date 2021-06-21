const Modelo = require('./ModeloTabelaFornecedor');

module.exports = {
  listar() {
    return Modelo.findAll();
  },
  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },
  async pegarPorId(id) {
    const encontrado = Modelo.findOne({
      where: { id },
    });

    if (!encontrado || null || undefined) {
      throw new Error('Fornecedor não encontrado');
    }

    return encontrado;
  },
  async atualizar(id, dadosParaAtualizar) {
    return Modelo.update(
      dadosParaAtualizar,
      {
        where: { id },
      },
    );
  },
};