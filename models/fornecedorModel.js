// model - banco de dados
const db = require("../config/firebase");

const ref = db.database().ref("fornecedores");

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
        cnpj: dados[id].cnpj
    }));
}


// =====================================================
// CADASTRAR NOVA CATEGORIA
// =====================================================
async function salvar(fornecedor) {

    // Cria um ID automático do Firebase
    const novoFornecedor = ref.push();

    await novoFornecedor.set({
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj
    });

    return {
        id: novoFornecedor.key,
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj
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
        cnpj: registro.val().cnpj
    };
}


// =====================================================
// EDITAR CATEGORIA
// =====================================================
async function editar(id, novoFornecedor) {

    await ref.child(id).update({
        nome: novoFornecedor.nome,
        cnpj: novoFornecedor.cnpj
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