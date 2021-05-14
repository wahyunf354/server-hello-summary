const Product = require("../Models/Product");
const Type = require("../Models/Type");
const Image= require("../Models/ImageUrl")

async function index(req, res) {
  try {
    const types = await Type.find();
    res.render("admin/product", {
      title: "Hello Summer | Product",
      types,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    req.flash("messages", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    req.redirect("/admin/product");
  }
}

async function addData(req, res) {
  try {
    const { name, description, price, type } = req.body;
    if (req.files.length > 0) {
      const type = await Type.findOne({ _id: type });
      const newProduct = {
        title,
        description,
        price,
        type: type._id,
      };
      const product = await Product.create(newProduct);
      type.productId.push({ _id: product._id });
      await type.save();
      for(let i= 0; i < req.files.length; i++) {
        const imageSave = await Image.create({imageUrl: `images/${req.files.filename}`})
        //! Terdapat masalah disini
        product.imageUrl.push({_id = imageSave._id})
        await product.save()
      }
      req.flash("messages", `Produk Baru Berhasil Ditambahkan`);
      req.flash("messageStatus", `success`);
      req.redirect("/admin/product");
    }
  } catch (error) {
    console.log(error);
    req.flash("messages", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    req.redirect("/admin/product");
  }
}

module.exports = {
  index,
  addData
};
