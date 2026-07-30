//model - bd
const db = require("../config/firebase");
const ref = db.ref("categorias");

//listar
async function listar() {
    let registros = await ref.once("value");
    let dados = registros.val();

    if (!dados) return [];

    return Object.keys(dados).map(id => ({
        id,
        nome: dados[id].nome
    }));
}

//exportar
module.exports = {
    listar
};