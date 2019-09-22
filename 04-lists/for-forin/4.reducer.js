const { obterPessoas } = require("./services");

Array.prototype.meuReduce = function(callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let i = 0; i <= this.length - 1; i++) {
    valorFinal = callback(valorFinal, this[i], this);
  }
  return valorFinal;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");

    const pesos = results.map(item => parseInt(item.height));
    console.log("pesos", pesos);
    //[20.2, 50.2, 66.2] = 0
    /* const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    }, 0); */

    const minhLista = [["Diogenes", "Oliveira"], ["Unifacs", "UEFS"]];

    const total = minhLista
      .meuReduce((anterio, proximo) => {
        return anterio.concat(proximo);
      }, [])
      .join(", ");

    console.log("total", total);
  } catch (error) {
    console.log("DEU RUIM", error);
  }
}

main();
