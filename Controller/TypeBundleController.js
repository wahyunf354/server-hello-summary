const TypeBundle = require("../Models/TypeBundles");

const index = async (req, res) => {
  try {
    const data = await TypeBundle.find();
    res.render("admin/type_bundle", {
      title: "Hello Summer | Paket",
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
      typeBundles: data,
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
    await TypeBundle.create({
      title,
      price,
      description,
      imageUrl: `images/${req.file.filename}`,
    });
    req.flash("message", `Berhasil Menambah Paket Franchise`);
    req.flash("messageStatus", "success");
    res.redirect("/admin/type_bundle");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type_bundle");
  }
};

module.exports = {
  index,
  addData,
};
