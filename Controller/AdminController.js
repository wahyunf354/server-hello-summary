function index(req, res, next) {
  res.render("admin/dashboard", { title: "Hello Summer | Dashboard" });
}

function login(req, res, next) {
  res.render("admin/login", { title: "Hello Summer | Login" });
}

module.exports = {
  index,
  login,
};
