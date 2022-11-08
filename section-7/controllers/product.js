const Product = require("../models/product");

module.exports.getAddProductPage = (req, res, next) => {
  res.render("add-product");
};

module.exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

module.exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { prods: products });
  });
};
