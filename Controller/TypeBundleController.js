const TypeBundle = require("../Models/TypeBundles");
const fs = require("fs-extra");
const path = require("path");

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

const detailData = async (req, res) => {
  try {
    const { id } = req.params;
    const typeBundle = await TypeBundle.findOne({ _id: id });
    console.log(typeBundle);
    res.render("admin/type_bundle/detail", {
      title: "Hello Summer | Detail",
      typeBundle,
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type_bundle");
  }
};

const editData = async (req, res) => {
  try {
    const { title, price, description, id } = req.body;
    const typeBundle = await TypeBundle.findOne({ _id: id });
    if (req.file == undefined) {
      // jika tidak ada gambar yang diupload
      typeBundle.title = title;
      typeBundle.price = price;
      typeBundle.description = description;
      await typeBundle.save();
      req.flash("message", `Berhasil Mengubah Paket Franchise`);
      req.flash("messageStatus", "success");
      res.redirect("/admin/type_bundle");
    } else {
      // Jika ada gambar yang diupaload
      // To delete file image before
      await fs.unlink(path.join(`public/${typeBundle.imageUrl}`));

      typeBundle.title = title;
      typeBundle.price = price;
      typeBundle.description = description;
      typeBundle.imageUrl = `images/${req.file.filename}`;
      await typeBundle.save();

      req.flash("message", `Berhasil Mengubah Paket Franchise`);
      req.flash("messageStatus", "success");
      res.redirect("/admin/type_bundle");
    }
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/type_bundle");
  }
};

const deleteData = async (req, res) => {
  try {
    // assign a variable id
    const { id } = req.params;
    // Find a data
    const typeBundle = await TypeBundle.findOne({ _id: id });
    // Delete file image from data type bundle
    await fs.unlink(path.join(`public/${typeBundle.imageUrl}`));
    // Delete data form db
    await typeBundle.remove();

    req.flash("message", `Berhasil Menghapus Paket Franchise`);
    req.flash("messageStatus", "warning");
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
  editData,
  detailData,
  deleteData,
};
