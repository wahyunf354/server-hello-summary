function index(req, res, next) {
  res.render("admin/dashboard", { title: "Hello Summer | Dashboard" });
}

function login(req, res, next) {
  res.render("admin/login", { title: "Hello Summer | Log in" });
}

module.exports = {
  index,
  login,
};
