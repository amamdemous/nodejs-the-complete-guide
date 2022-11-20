const Product = require("../models/product");

module.exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "[Admin] Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

module.exports.getEditProductPage = (req, res, next) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "[Admin] Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

module.exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(productId, title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "[Admin] Products",
      path: "/admin/products",
    });
  });
};

module.exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};
