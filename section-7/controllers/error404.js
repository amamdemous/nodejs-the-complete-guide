module.exports.getError404Page = (req, res, next) => {
  res.status(404).render("page-not-found");
};
