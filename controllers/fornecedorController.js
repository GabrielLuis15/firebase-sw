const fornecedorModel = require("../models/fornecedorModel");

// =====================================================
// LISTAR FORNECEDORES
// =====================================================
async function listar(req, res) {

    try {

        const fornecedores = await fornecedorModel.listar();

        res.render("fornecedores/index", {
            fornecedores,
            fornecedorEditar: null
        });

    } catch (erro) {

        console.error("Erro ao listar fornecedores:", erro);

        res.status(500).send("Erro ao carregar fornecedores.");
    }
}


// =====================================================
// FORMULÁRIO DE CADASTRO
// =====================================================
async function formCadastro(req, res) {

    try {

        const fornecedores = await fornecedorModel.listar();

        res.render("fornecedores/index", {
            fornecedores,
            fornecedorEditar: null
        });

    } catch (erro) {

        console.error("Erro ao carregar formulário:", erro);

        res.status(500).send("Erro ao carregar formulário.");
    }
}


// =====================================================
// SALVAR NOVO FORNECEDOR
// =====================================================
async function salvar(req, res) {

    try {

        const fornecedor = {
            nome: req.body.nome,
            cnpj: req.body.cnpj
        };

        await fornecedorModel.salvar(fornecedor);

        res.redirect("/fornecedores");

    } catch (erro) {

        console.error("Erro ao salvar fornecedor:", erro);

        res.status(500).send("Erro ao salvar fornecedor.");
    }
}


// =====================================================
// FORMULÁRIO DE EDIÇÃO
// =====================================================
async function formEditar(req, res) {

    try {

        const id = req.params.id;

        const fornecedorEditar =
            await fornecedorModel.buscarPorId(id);

        if (!fornecedorEditar) {
            return res.status(404).send("Fornecedor não encontrado.");
        }

        const fornecedores =
            await fornecedorModel.listar();

        res.render("fornecedores/index", {
            fornecedores,
            fornecedorEditar
        });

    } catch (erro) {

        console.error("Erro ao buscar fornecedor:", erro);

        res.status(500).send("Erro ao carregar fornecedor.");
    }
}


// =====================================================
// EDITAR FORNECEDOR
// =====================================================
async function editar(req, res) {

    try {

        const id = req.params.id;

        const novoFornecedor = {
            nome: req.body.nome,
            cnpj: req.body.cnpj
        };

        await fornecedorModel.editar(id, novoFornecedor);

        res.redirect("/fornecedores");

    } catch (erro) {

        console.error("Erro ao editar fornecedor:", erro);

        res.status(500).send("Erro ao editar fornecedor.");
    }
}


// =====================================================
// EXCLUIR FORNECEDOR
// =====================================================
async function excluir(req, res) {

    try {

        const id = req.params.id;

        await fornecedorModel.excluir(id);

        res.redirect("/fornecedores");

    } catch (erro) {

        console.error("Erro ao excluir fornecedor:", erro);

        res.status(500).send("Erro ao excluir fornecedor.");
    }
}


// =====================================================
// EXPORTAÇÃO
// =====================================================
module.exports = {
    listar,
    formCadastro,
    salvar,
    formEditar,
    editar,
    excluir
};