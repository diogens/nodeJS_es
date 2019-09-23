const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

//outra for de obter dados do json
//const dadosJson = require('./herois.json')

class Database {
  constructor() {
    this.NOME_ARQUIVO = "herois.json";
  }
  async obterDadosArquivos() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivos(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivos();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    /* 
      {
        nome: Flash,
        poder: Velocidade
      }
      {
        id: 12312312424
      }
      junta os 2 objetos
      {
        nome: Flash,
        poder Velocidade
        id: 12312412515
      }
    */

    const heroiIdComId = {
      id,
      ...heroi
    };

    const dadosFinal = [...dados, heroiIdComId];
    /* 
    [
      {
        nome: Flash
      }
    ] 
    [
      {
        nome: Batman
      }
    ]
    a ideia é concatenar od 2 arrays assim
    [
      {
        nome: Flash
      }
      {
        nome: Batman
      }
    ]
    */
    const resultado = await this.escreverArquivos(dadosFinal);
    return resultado;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivos();
    const dadosFiltrados = dados.filter(item => (id ? item.id === id : true));
    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivos([]);
    }

    const dados = await this.obterDadosArquivos();

    const indice = dados.findIndex(item => item.id === parseInt(id));
    if (indice === -1) {
      throw Error("O usuario informado não existe");
    }
    dados.splice(indice, 1);
    return await this.escreverArquivos(dados);
  }

  async atualizar(id, modificacoes) {
    const dados = await this.obterDadosArquivos();
    const indice = dados.findIndex(item => item.id === parseInt(id));

    if (indice === -1) {
      throw Error("O heroi informado não existe");
    }
    const atual = dados[indice];
    const objetoAtualizar = {
      ...atual,
      ...modificacoes
    };
    dados.splice(indice, 1);

    return await this.escreverArquivos([...dados, objetoAtualizar]);
  }
}

module.exports = new Database();
