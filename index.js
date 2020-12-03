const express = require("express");
const app = express();
const port = 5000;

const hbs = require("express-handlebars");
const emotions = require("./data");
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
  res.render("index", { title: "home" });
});

app.get("/task2", (req, res) => {
  res.render("task2", { title: "Test", quotePath: "/task2/default.jpg" });
});

app.get("/task2/:emotion", (req, res) => {
  let img;
  emotions.forEach((e) => {
    if (e.title == req.params.emotion) {
      img = e.quotePath;
      return;
    }
  });
  res.render("task2", { title: "Test", quotePath: img });
});

app.get("/task3", (req, res) => {
  res.render("task3", { title: "Test" });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
