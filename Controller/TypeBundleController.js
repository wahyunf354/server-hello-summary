const index = async (req, res) => {
  try {
    res.render("admin/type_bundle", {
      title: "Hello Summer | Paket",
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type_bundle");
  }
};

const addData = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    // FIXME Data belum tampil
    console.log(title, price, description);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  index,
  addData,
};
