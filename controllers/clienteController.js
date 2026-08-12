const clienteModel = require("../models/clienteModel");

// =====================================================
// LISTAR CLIENTES
// =====================================================
async function listar(req, res) {

    try {

        const clientes = await clienteModel.listar();

        res.render("clientes/index", {
            clientes,
            clienteEditar: null
        });

    } catch (erro) {

        console.error("Erro ao listar clientes:", erro);

        res.status(500).send("Erro ao carregar clientes.");
    }
}


// =====================================================
// FORMULÁRIO DE CADASTRO
// =====================================================
async function formCadastro(req, res) {

    try {

        const clientes = await clienteModel.listar();

        res.render("clientes/index", {
            clientes,
            clienteEditar: null
        });

    } catch (erro) {

        console.error("Erro ao carregar formulário:", erro);

        res.status(500).send("Erro ao carregar formulário.");
    }
}


// =====================================================
// SALVAR NOVO CLIENTE
// =====================================================
async function salvar(req, res) {

    try {

        const cliente = {
            nome: req.body.nome,
            email: req.body.email
        };

        await clienteModel.salvar(cliente);

        res.redirect("/clientes");

    } catch (erro) {

        console.error("Erro ao salvar cliente:", erro);

        res.status(500).send("Erro ao salvar cliente.");
    }
}


// =====================================================
// FORMULÁRIO DE EDIÇÃO
// =====================================================
async function formEditar(req, res) {

    try {

        const id = req.params.id;

        const clienteEditar =
            await clienteModel.buscarPorId(id);

        if (!clienteEditar) {
            return res.status(404).send("Cliente não encontrado.");
        }

        const clientes =
            await clienteModel.listar();

        res.render("clientes/index", {
            clientes,
            clienteEditar
        });

    } catch (erro) {

        console.error("Erro ao buscar cliente:", erro);

        res.status(500).send("Erro ao carregar cliente.");
    }
}


// =====================================================
// EDITAR CLIENTE
// =====================================================
async function editar(req, res) {

    try {

        const id = req.params.id;

        const novoCliente = {
            nome: req.body.nome,
            email: req.body.email
        };

        await clienteModel.editar(id, novoCliente);

        res.redirect("/clientes");

    } catch (erro) {

        console.error("Erro ao editar cliente:", erro);

        res.status(500).send("Erro ao editar cliente.");
    }
}


// =====================================================
// EXCLUIR CLIENTE
// =====================================================
async function excluir(req, res) {

    try {

        const id = req.params.id;

        await clienteModel.excluir(id);

        res.redirect("/clientes");

    } catch (erro) {

        console.error("Erro ao excluir cliente:", erro);

        res.status(500).send("Erro ao excluir cliente.");
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