/* eslint-disable max-classes-per-file */
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');

class Serializador {
  // eslint-disable-next-line class-methods-use-this
  json(dados) {
    return JSON.stringify(dados);
  }

  serializar(dados) {
    if (this.contentType === 'application/json') {
      return this.filtrar(dados);
    }

    throw new ValorNaoSuportado(this.contentType);
  }

  filtrarObjeto(dados) {
    const novoObjeto = {};
    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        novoObjeto[campo] = dados[campo];
      }
    });
    console.log(JSON.stringify(novoObjeto));
    return novoObjeto;
  }

  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((item) => this.filtrarObjeto(item));
    } else {
      dados = this.filtrarObjeto(dados);
    }
    console.log(dados);
    return dados;
  }
}

class SerializadorFornecedor extends Serializador {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ['id', 'empresa', 'categoria'];
  }
}
module.exports = {
  Serializador,
  SerializadorFornecedor,
  formatosAceitos: ['application/json'],
};
