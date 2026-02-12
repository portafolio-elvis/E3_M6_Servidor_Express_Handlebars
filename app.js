const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "hbs");
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")),
);

hbs.registerPartials(path.join(__dirname, "/views/partials"));

hbs.registerHelper("priorityClass", function (priority) {
  if (priority === "alta") {
    return "priority-high";
  } else if (priority === "media") {
    return "priority-medium";
  } else {
    return "priority-low";
  }
});

app.get("/perfil", (req, res) => {
  res.render("perfil", {
    nombre: "Ana",
    profesion: "Desarrolladora Web",
  });
});

app.get("/dashboard", (req, res) => {
  const data = {
    user: {
      name: "Carlos",
      isAdmin: true,
    },
    projects: [
      {
        name: "API Gateway",
        isCompleted: false,
        tasks: [
          { description: "Diseñar endpoints", priority: "alta" },
          { description: "Implementar JWT", priority: "alta" },
          { description: "Crear documentación", priority: "media" },
        ],
      },
      {
        name: "Refactor del Frontend",
        isCompleted: true,
        tasks: [
          { description: "Migrar a React 18", priority: "baja" },
          { description: "Actualizar dependencias", priority: "baja" },
        ],
      },
      {
        name: "Base de Datos",
        isCompleted: false,
        tasks: [],
      },
    ],
  };
  res.render("dashboard", data);
});

app.get("/script", (req, res) => {
  res.sendFile(path.join(__dirname, "public/js/script.js"));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
