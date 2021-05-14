const Type = require("../Models/Type");

const index = async (req, res) => {
  try {
    const types = await Type.find();
    res.render("admin/type", {
      title: "Hello Summer | Kategori",
      types,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type");
  }
};

const addData = async (req, res) => {
  try {
    const { title } = req.body;
    await Type.create({ title });

    req.flash("message", `Berhasil Menambah Data Kategori`);
    req.flash("messageStatus", "success");
    res.redirect("/admin/type");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type");
  }
};

module.exports = {
  index,
  addData,
};
