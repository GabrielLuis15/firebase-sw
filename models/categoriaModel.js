// model - banco de dados
const db = require("../config/firebase");

const ref = db.database().ref("categorias");

// =====================================================
// LISTAR CATEGORIAS
// =====================================================
async function listar() {

    const registros = await ref.once("value");
    const dados = registros.val();

    if (!dados) return [];

    return Object.keys(dados).map(id => ({
        id,
        nome: dados[id].nome
    }));
}


// =====================================================
// CADASTRAR NOVA CATEGORIA
// =====================================================
async function salvar(categoria) {

    // Cria um ID automático do Firebase
    const novaCategoria = ref.push();

    await novaCategoria.set({
        nome: categoria.nome
    });

    return {
        id: novaCategoria.key,
        nome: categoria.nome
    };
}


// =====================================================
// BUSCAR CATEGORIA POR ID
// =====================================================
async function buscarPorId(id) {

    const registro = await ref.child(id).once("value");

    if (!registro.exists()) {
        return null;
    }

    return {
        id: registro.key,
        nome: registro.val().nome
    };
}


// =====================================================
// EDITAR CATEGORIA
// =====================================================
async function editar(id, novaCategoria) {

    await ref.child(id).update({
        nome: novaCategoria.nome
    });
}


// =====================================================
// EXCLUIR CATEGORIA
// =====================================================
async function excluir(id) {

    await ref.child(id).remove();
}


// =====================================================
// EXPORTAÇÃO
// =====================================================
module.exports = {
    listar,
    salvar,
    buscarPorId,
    editar,
    excluir
};