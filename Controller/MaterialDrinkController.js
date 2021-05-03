const MaterialDrink = require("../Models/MaterialDrink");

const index = async (req, res) => {
  try {
    const materialDrinks = await MaterialDrink.find();
    res.render("admin/material_drink", {
      title: "Hello Summer | Suplay Bahan",
      data: materialDrinks,
    });
  } catch (error) {
    console.log(error);
  }
};

const addData = async (req, res) => {
  const { name, unit, price } = req.body;
  try {
    const materialDrink = new MaterialDrink({ name, unit, price });
    await materialDrink.save();
    res.redirect("/admin/material_drink");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
  addData,
};
