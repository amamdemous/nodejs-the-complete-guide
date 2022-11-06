const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin");

router.get("/", (req, res, next) => {
  res.render("shop", { prods: adminRoutes.products });
});

module.exports = router;
