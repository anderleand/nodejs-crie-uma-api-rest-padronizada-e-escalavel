const Modelo = require('./ModeloTabelaFornecedor');
// const NaoEncontrado = require('../../erros/NaoEncontrado');

module.exports = {
  listar() {
    return Modelo.findAll({ raw: true });
  },

  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },

  pegarPorId(id) {
    const encontrado = Modelo.findOne({
      where: { id },
    });
    // console.log(`Isso é um log ${encontrado.json()}`);
    // if (!encontrado || null || undefined) {
    //   throw new NaoEncontrado();
    // }
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
