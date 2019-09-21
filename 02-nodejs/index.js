/* 
0 - Obter um usuario 
1 - Obter o numero de telefone de um usuario a partir de seu ID
2 - Obter o endereço do usuario ID
*/

//importamos um modulo interno do node.js
const util = require("util");
const obterEnderecoAsyc = util.promisify(obterEndereço);

function obterUsuario() {
  //quando der algum problema  -> chama o reject (ERRO)
  //quando der sucess  -> chama o rsolver (SUCESSO)
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      /* return reject(new Error("DEU RUIM DE VERDADES, IIIII")); */
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, resject) {
    setTimeout(() => {
      return resolve({
        telefone: "12312312124",
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereço(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Rua Deserto do Ceará",
      numero: 55
    });
  }, 2000);
}

//1º passso adicionar a palavra async -> automaticamente ela retornara uma  promisse
main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    /* const telefone = await obterTelefone(usuario.id);
    const endereco = await obterEnderecoAsyc(usuario.id); */

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsyc(usuario.id)
    ]);

    const endereco = resultado[0];
    const telefone = resultado[1];

    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone},
      Endereço: ${endereco.rua} ${endereco.numero},
    `);
    console.timeEnd("medida-promise");
  } catch (erro) {
    console.erro("DEU RUIM MANOOOO", erro);
  }
}

/* const usuarioPromise = obterUsuario();
//para manipular com sucesso usamos a função .then
//para manipular com erros usamos a função .catch
//usuario -> telefone -> telefone
usuarioPromise
  .then(function(usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      };
    });
  })
  .then(function(resultado) {
    const endereco = obterEnderecoAsyc(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      };
    });
  })
  .then(function(resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero} 
      Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
    `);
  })
  .catch(function(erro) {
    console.error("Deu ruim na carniça", erro);
  }); */

/* function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
} */

/* obterUsuario(function resolverUsuario(erro, usuario) {
  if (erro) {
    console.error("DEU RUIM em USUARIO", error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("DEU RUIM em TELEFONE", error1);
      return;
    }
    obterEndereço(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error("DEU RUIM em ENDERECO", error2);
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua} ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `);
    });
  });
}); */

/* const telefone = obterTelefone(usuario.id); */

/* console.log("usuario", usuario); */
/* console.log("telefone", telefone); */
