const MaterialDrink = require("../Models/MaterialDrink");

const index = async (req, res) => {
  try {
    const materialDrinks = await MaterialDrink.find();
    res.render("admin/material_drink", {
      title: "Hello Summer | Suplay Bahan",
      data: materialDrinks,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/material_drink");
  }
};

const addData = async (req, res) => {
  const { name, unit, price } = req.body;
  try {
    const materialDrink = new MaterialDrink({ name, unit, price });
    await materialDrink.save();
    req.flash("message", `Berhasil Menambah Suplai Bahan`);
    req.flash("messageStatus", "success");
    res.redirect("/admin/material_drink");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/material_drink");
  }
};

const editData = async (req, res) => {
  try {
    const { name, price, unit, id } = req.body;
    const materialDrink = await MaterialDrink.findOne({ _id: id });
    materialDrink.name = name;
    materialDrink.price = price;
    materialDrink.unit = unit;
    await materialDrink.save();
    req.flash("message", `Berhasil Mengubah Suplai Bahan`);
    req.flash("messageStatus", "success");
    res.redirect("/admin/material_drink");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/material_drink");
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const materialDrink = await MaterialDrink.findOne({ _id: id });
    console.log(materialDrink);
    await materialDrink.remove();
    req.flash("message", `Berhasil Menghapus Suplai Bahan`);
    req.flash("messageStatus", "warning");
    res.redirect("/admin/material_drink");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/material_drink");
  }
};

module.exports = {
  index,
  addData,
  editData,
  deleteData,
};
