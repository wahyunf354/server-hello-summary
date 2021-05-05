const TypeBundle = require("../Models/TypeBundles");
function index(req, res) {
  res.render("admin/patner", { title: "Hello Summer | Patner" });
}

const displayformAdd = async (req, res) => {
  try {
    const typeBundle = await TypeBundle.find();
    res.render("admin/patner/add", {
      title: "Hello Summer | Tambah Patner",
      typeBundle,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const addData = async (req, res) => {
  try {
    const { nameOwner } = req.body;
    console.log(nameOwner);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  index,
  displayformAdd,
  addData,
};
