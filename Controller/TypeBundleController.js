function index(req, res) {
  res.render("admin/type_bundle", { title: "Hello Summer | Paket" });
}

module.exports = {
  index,
};
