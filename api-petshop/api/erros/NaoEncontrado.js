class NaoEncontrado extends Error {
  constructor() {
    const mensagem = 'Fornecedor não foi encontrado!';
    super(mensagem);
    this.name = 'NaoEncontrrado';
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;
