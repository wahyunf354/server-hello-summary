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

const editData = async (req, res) => {
  try {
    const { id, title } = req.body;

    const type = await Type.findOne({ _id: id });
    type.title = title;
    await type.save();

    req.flash("message", `Berhasil Menambah Data Kategori`);
    req.flash("messageStatus", "success");
    res.redirect("/admin/type");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type");
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await Type.findOne({ _id: id });
    await type.remove();

    req.flash("message", `Berhasil Menghapus Data`);
    req.flash("messageStatus", "warning");
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
  editData,
  deleteData,
};
