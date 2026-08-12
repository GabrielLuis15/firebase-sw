const categoriaModel = require("../models/categoriaModel");

// =====================================================
// LISTAR CATEGORIAS
// =====================================================
async function listar(req, res) {

    try {

        const categorias = await categoriaModel.listar();

        res.render("categorias/index", {
            categorias,
            categoriaEditar: null
        });

    } catch (erro) {

        console.error("Erro ao listar categorias:", erro);

        res.status(500).send("Erro ao carregar categorias.");
    }
}


// =====================================================
// FORMULÁRIO DE CADASTRO
// =====================================================
async function formCadastro(req, res) {

    try {

        const categorias = await categoriaModel.listar();

        res.render("categorias/index", {
            categorias,
            categoriaEditar: null
        });

    } catch (erro) {

        console.error("Erro ao carregar formulário:", erro);

        res.status(500).send("Erro ao carregar formulário.");
    }
}


// =====================================================
// SALVAR NOVA CATEGORIA
// =====================================================
async function salvar(req, res) {

    try {

        const categoria = {
            nome: req.body.nome
        };

        await categoriaModel.salvar(categoria);

        res.redirect("/categorias");

    } catch (erro) {

        console.error("Erro ao salvar categoria:", erro);

        res.status(500).send("Erro ao salvar categoria.");
    }
}


// =====================================================
// FORMULÁRIO DE EDIÇÃO
// =====================================================
async function formEditar(req, res) {

    try {

        const id = req.params.id;

        const categoriaEditar =
            await categoriaModel.buscarPorId(id);

        if (!categoriaEditar) {
            return res.status(404).send("Categoria não encontrada.");
        }

        const categorias =
            await categoriaModel.listar();

        res.render("categorias/index", {
            categorias,
            categoriaEditar
        });

    } catch (erro) {

        console.error("Erro ao buscar categoria:", erro);

        res.status(500).send("Erro ao carregar categoria.");
    }
}


// =====================================================
// EDITAR CATEGORIA
// =====================================================
async function editar(req, res) {

    try {

        const id = req.params.id;

        const novaCategoria = {
            nome: req.body.nome
        };

        await categoriaModel.editar(id, novaCategoria);

        res.redirect("/categorias");

    } catch (erro) {

        console.error("Erro ao editar categoria:", erro);

        res.status(500).send("Erro ao editar categoria.");
    }
}


// =====================================================
// EXCLUIR CATEGORIA
// =====================================================
async function excluir(req, res) {

    try {

        const id = req.params.id;

        await categoriaModel.excluir(id);

        res.redirect("/categorias");

    } catch (erro) {

        console.error("Erro ao excluir categoria:", erro);

        res.status(500).send("Erro ao excluir categoria.");
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