const model = require("../models/categoriaModel");

//listar
exports.index = async (req, res) => {
    let categorias = await model.listar();

    res.render("categorias/index", {
        categorias,
        categoriaEditar: null
    });
};