const Commander = require("commander");

const Database = require("./database");

async function main() {
  Commander.version("v1")
    .parse(process.argv)
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-c, --cadastrar", "Cadastrar um Heroi");

  try {
    if (Commander.cadastrar) {
      console.log(Commander);
      /* const resultado = await.Database.cadastrar(Commander) */
    }
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
