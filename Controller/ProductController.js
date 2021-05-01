function index(req, res) {
  res.render("admin/product", { title: "Hello Summer | Product" });
}

module.exports = {
  index,
};
