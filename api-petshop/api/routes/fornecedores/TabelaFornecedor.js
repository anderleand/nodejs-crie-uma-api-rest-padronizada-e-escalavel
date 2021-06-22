const Modelo = require('./ModeloTabelaFornecedor');

module.exports = {
  listar() {
    return Modelo.findAll();
  },

  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },

  pegarPorId(id) {
    const encontrado = Modelo.findOne({
      where: { id },
    });

    return encontrado;
  },

  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(
      dadosParaAtualizar,
      {
        where: { id },
      },
    );
  },

  delete(id) {
    return (Modelo.destroy({
      where: { id },
    }));
  },

};
