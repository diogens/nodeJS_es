Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = [];
  for (let i = 0; i <= this.length - 1; i++) {
    const resultado = callback(this[i], i);
    novoArrayMapeado.push(resultado);
    /* console.log("Result", novoArrayMapeado); */
  }
  return novoArrayMapeado;
};

const service = require("./services");

async function main() {
  try {
    const results = await service.obterPessoas("a");
    /* const names = []; */

    /* results.results.forEach(item => {
      names.push(item.name);
    }); */

    /* const names = results.results.map(pessoa => {
      return pessoa.name;
    }); */

    /*  const names = results.results.map(pessoa => pessoa.name); */

    const names = results.results.meuMap(function(pessoa, indice) {
      return `[${indice}] ${pessoa.name}`;
    });

    console.log("names", names);
  } catch (error) {
    console.error("DEU RUIM PORRA", error);
  }
}

main();
