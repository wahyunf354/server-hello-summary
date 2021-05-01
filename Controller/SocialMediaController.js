function index(req, res) {
  res.render("admin/social_media", { title: "Hello Summer | Sosial Media" });
}

function addData(req, res) {
  const { username, media } = req.body;
  // console.log(username, media);
}

module.exports = {
  index,
  addData,
};
