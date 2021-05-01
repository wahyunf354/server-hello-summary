function index(req, res) {
  res.render("admin/material_drink", { title: "Hello Summer | Suplay Bahan" });
}

module.exports = {
  index,
};
