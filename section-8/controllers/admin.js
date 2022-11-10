const Product = require("../models/product");

module.exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product");
};

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageURL, description, price);
  product.save();
  res.redirect("/");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", { prods: products });
  });
};
