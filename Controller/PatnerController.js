function index(req, res) {
  res.render("admin/patner", { title: "Hello Summer | Patner" });
}

module.exports = {
  index,
};
