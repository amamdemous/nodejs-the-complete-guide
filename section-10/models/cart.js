const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(content);
      }

      const existProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existProduct = cart.products[existProductIndex];
      let updatedProduct;

      if (existProduct) {
        updatedProduct = { ...existProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, content) => {
      if (err) {
        return;
      }

      const updatedCart = { ...JSON.parse(content) };
      const product = updatedCart.products.find((p) => p.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, content) => {
      const cart = JSON.parse(content);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
