const Product = require("../Models/Product");
const Type = require("../Models/Type");
const Image = require("../Models/ImageUrl");

async function index(req, res) {
  try {
    const types = await Type.find();
    const products = await Product.find().populate("imageUrl");

    res.render("admin/product", {
      title: "Hello Summer | Product",
      products,
      types,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    req.redirect("/admin/product");
  }
}

async function addData(req, res) {
  try {
    const { name, description, price, type_id } = req.body;
    console.log(req.files);
    if (req.files.length > 0) {
      // panggil type
      const type = await Type.findOne({ _id: type_id });
      console.log(type);

      // simpan product
      const newProduct = {
        name,
        description,
        price,
        type: type._id,
      };
      const product = await Product.create(newProduct);

      // simpan id product pada type
      type.productId.push({ _id: product._id });
      await type.save();

      // Melakukan penyimpanan gambar product
      for (let i = 0; i < req.files.length; i++) {
        const imageSave = await Image.create({
          imageUrl: `images/${req.files[i].filename}`,
        });

        product.imageUrl.push({ _id: imageSave._id });
        await product.save();
      }

      req.flash("message", `Produk Baru Berhasil Ditambahkan`);
      req.flash("messageStatus", `success`);
      res.redirect("/admin/product");
    }
  } catch (error) {
    console.log(error);
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    res.redirect("/admin/product");
  }
}

module.exports = {
  index,
  addData,
};
