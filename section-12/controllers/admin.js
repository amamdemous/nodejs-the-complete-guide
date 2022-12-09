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
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "[Admin] Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, null, req.user._id);
  product
    .save()
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

module.exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl, productId)
  product.save()
    .then((res) => console.log("Updated product"))
    .catch((err) => console.log(err));
  res.redirect("/admin/products");
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/product-list", {
        prods: products,
        pageTitle: "[Admin] Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId).then(() => res.redirect("/admin/products"))
}
