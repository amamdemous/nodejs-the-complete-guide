const Product = require("../models/product");

module.exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", { prods: products });
  });
};

module.exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { prods: products });
  });
};

module.exports.getCart = (req, res, next) => {
  res.render("shop/cart");
};

module.exports.getOrders = (req, res, next) => {
  res.render("shop/orders");
};

module.exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout");
};
