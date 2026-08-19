// model - banco de dados
const db = require("../config/firebase");

const ref = db.database().ref("clientes");

// =====================================================
// LISTAR CATEGORIAS
// =====================================================
async function listar() {

    const registros = await ref.once("value");
    const dados = registros.val();

    if (!dados) return [];

    return Object.keys(dados).map(id => ({
        id,
        nome: dados[id].nome,
        email: dados[id].email
    }));
}


// =====================================================
// CADASTRAR NOVA CATEGORIA
// =====================================================
async function salvar(cliente) {

    // Cria um ID automático do Firebase
    const novoCliente = ref.push();

    await novoCliente.set({
        nome: cliente.nome,
        email: cliente.email

    });

    return {
        id: novoCliente.key,
        nome: cliente.nome,
        email: cliente.email
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
        nome: registro.val().nome,
        email: registro.val().email
    };
}


// =====================================================
// EDITAR CATEGORIA
// =====================================================
async function editar(id, novoCliente) {

    await ref.child(id).update({
        nome: novoCliente.nome,
        email: novoCliente.email
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