const Product = require("../Models/Product");
const Type = require("../Models/Type");
const Image = require("../Models/ImageUrl");
const { formatNumber } = require("../utility/formatNumber");

// function untuk menampilkan semua product
async function index(req, res) {
  try {
    const types = await Type.find();
    const products = await Product.find();

    const result = products.map((e) => {
      return {
        ...e._doc,
        price: formatNumber(e.price),
      };
    });

    res.render("admin/product", {
      title: "Hello Summer | Product",
      products: result,
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

// function untuk menambah produk baru
async function addData(req, res) {
  try {
    const { name, description, price, type_id } = req.body;
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

// function untuk menampilkan 1 product berdasarkan id
async function show(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("imageUrl");
    const priceHasFormat = formatNumber(product.price);

    res.render("admin/product/info", {
      title: "Hello Summer | Info Produk",
      product,
      priceHasFormat,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    console.log("Error: ", error);
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    res.redirect("/admin/product");
  }
}

// function untuk menambah gambar product yang sudah ada
async function addImages(req, res) {
  try {
    const { id } = req.params;
    if (req.files.length > 0) {
      const product = await Product.findById(id);

      // Melakukan penyimpanan gambar product
      for (let i = 0; i < req.files.length; i++) {
        const imageSave = await Image.create({
          imageUrl: `images/${req.files[i].filename}`,
        });

        // simpan id gambar di product
        product.imageUrl.push({ _id: imageSave._id });
        await product.save();
      }

      req.flash("message", `Gambar Berhasil Ditambahkan`);
      req.flash("messageStatus", `success`);
      res.redirect("/admin/product/" + id);
    }
  } catch (error) {
    console.log("Error: ", error);
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    res.redirect("/admin/product");
  }
}

async function deleteImage(req, res) {
  try {
    const { idProduct, idImage } = req.params;

    // delete file image on folder
    // TODO:

    // delete data image on db
    const product = await Product.find(idProduct);
    const newImages = product.imageUrl.filter((e) => e != idImage);

    // 1. Delete data on colection Image
    await Image.findOneAndRemove({ _id: idImage });
    // 2. Delete data id image on collection Product
    product.imageUrl = newImages;
    await product.save();
    req.flash("message", `Gambar Berhasil Ditambahkan`);
    req.flash("messageStatus", `success`);
    res.redirect("/admin/product/" + idProduct);
  } catch (error) {
    console.log("Error: ", error);
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", `danger`);
    res.redirect("/admin/product");
  }
}

module.exports = {
  index,
  addData,
  show,
  addImages,
  deleteImage,
};
