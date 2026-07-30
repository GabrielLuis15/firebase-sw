const express = require("express");
const path = require("path");

const app = express();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// FORM
app.use(express.urlencoded({ extended: true }));

// ROTAS
const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

// 🔥 INDEX PRINCIPAL
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Página Inicial",
  });
});

// SERVER
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
