const express = require("express");
const app = express();
const port = 5000;

const hbs = require("express-handlebars");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", { title: "home", activeTab: { home: true } });
});

app.get("/task2", (req, res) => {
  res.render("task2", { title: "Test", activeTab: { quote: true } });
});

app.get("/task3", (req, res) => {
  res.render("task3", { title: "TV", activeTab: { tv: true } });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
