function index(req, res) {
  res.render("admin/patner/index", { title: "Hellow Summary | Patner" });
}

module.exports = {
  index,
};
