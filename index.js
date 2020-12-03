const { categories, emotions, products } = require("./data");
const express = require("express");
const app = express();
const port = 5001;

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
  res.render("task2", {
    title: "Inspiring Quotes",
    quotePath: "/task2/default.jpg",
  });
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
  res.render("task2", { title: "Inspiring Quotes", quotePath: img });
});

app.get("/task3", (req, res) => {
  let frontEndPrefixes = { title: "TV", activeTab: { tv: true } };
  let context = {
    ...frontEndPrefixes,
    categories: [...categories],
    products: [...products],
  };
  res.render("task3", context);
});

app.get("/task3/category/:id", (req, res) => {
  let frontEndPrefixes = { title: "TV", activeTab: { tv: true } };
  let productList = products.filter((p) => {
    return p.category.toString() === req.params.id.toString();
  });
  console.log(productList);
  let context = {
    ...frontEndPrefixes,
    categories: [...categories],
    products: productList,
  };
  res.render("task3", context);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
