/* eslint-disable max-classes-per-file */
const jsontoxml = require('jsontoxml');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');

class Serializador {
  // eslint-disable-next-line class-methods-use-this
  json(dados) {
    return JSON.stringify(dados);
  }

  xml(dados) {
    let tag = this.tagSingular;
    if (Array.isArray(dados)) {
      tag = this.tagPlural;
      dados = dados.map((item) => ({
        [this.tagSingular]: item,
      }));
    }
    return jsontoxml({ [tag]: dados });
  }

  serializar(dados) {
    dados = this.filtrar(dados);
    if (this.contentType === 'application/json') {
      return this.json(dados);
    }

    if (this.contentType === 'application/xml') {
      return this.xml(dados);
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
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ['id', 'empresa', 'categoria'].concat(camposExtras || []);
    this.tagSingular = 'fornecedor';
    this.tagPlural = 'fornecedores';
  }
}

class SerializadorErro extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ['id', 'mensagem'].concat(camposExtras || []);
    this.tagSingular = 'erro';
    this.tagPlural = 'erros';
  }
}
module.exports = {
  Serializador,
  SerializadorFornecedor,
  SerializadorErro,
  formatosAceitos: ['application/json', 'application/xml'],
};
