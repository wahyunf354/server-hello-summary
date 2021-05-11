const Patner = require("../Models/Patner");
const TypeBundles = require("../Models/TypeBundles");
const bcrypt = require("bcrypt");
const fs = require("fs-extra");
const path = require("path");
const saltRounds = 10;

const index = async (req, res) => {
  try {
    const patners = await Patner.find();
    res.render("admin/patner", {
      title: "Hello Summer | Patner",
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
      patners,
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner");
  }
};

const displayformAdd = async (req, res) => {
  try {
    const typeBundle = await TypeBundles.find();
    res.render("admin/patner/add", {
      title: "Hello Summer | Tambah Patner",
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
      typeBundle,
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner/add");
  }
};

const addData = async (req, res) => {
  try {
    const {
      dateJoin,
      noHp,
      locationStore,
      address,
      typeBundleId,
      nameOwner,
      noNik,
      nameBrand,
      tagline,
      isRequestLogo,
      color,
      username,
      password,
      confPassword,
      facebook,
      instagram,
      email,
    } = req.body;
    if (password !== confPassword) {
      req.flash("message", `Password tidak sama`);
      req.flash("messageStatus", "danger");
      res.redirect("/admin/patner/add");
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    const typeBundle = await TypeBundles.findOne({ _id: typeBundleId });
    const newItem = {
      nameOwner,
      noNik,
      address,
      locationStore,
      noHp,
      dateJoin,
      nameBrand,
      tagline,
      isRequestLogo,
      color,
      typeBundleId: [
        {
          _id: typeBundle._id,
          price: typeBundle.price,
        },
      ],
      email,
      password: hash,
      facebook,
      instagram,
      imageUrlKtp: `images/${req.file.filename}`,
    };
    const patner = await Patner.create(newItem);
    typeBundle.patnerId.push({ _id: patner._id });
    await typeBundle.save();
    req.flash("message", `Berhasil menambah data`);
    req.flash("messageStatus", "success");
    res.redirect("/admin/patner");
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner/add");
  }
};

const detailPatner = async (req, res) => {
  try {
    const { id } = req.params;
    const patner = await Patner.findOne({ _id: id });

    res.render("admin/patner/detail", {
      title: `Hello Summer | ${patner.nameOwner}`,
      patner,
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner/add");
  }
};

const displayformEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const patner = await Patner.findOne({ _id: id });
    res.render("admin/patner/edit", {
      title: `Hello Summer | Edit Data Patner ${patner.nameOwner}`,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
      patner,
    });
  } catch (error) {
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner/add");
  }
};

const editProfilePatner = async (req, res) => {
  try {
    const body = req.body;
    const patner = await Patner.findOne({ _id: body.id });
    if (req.file == undefined) {
      // jika tidak ada foto ktp yang diupload
      patner.nameOwer = body.nameOwer;
      patner.noNik = body.noNik;
      patner.address = body.address;
      patner.locationStore = body.locationStore;
      patner.noHp = body.noHp;
      patner.nameBrand = body.nameBrand;
      patner.tagline = body.tagline;
      patner.isRequestLogo = body.isRequestLogo;
      patner.color = body.color;
      patner.email = body.email;
      patner.facebook = body.facebook;
      patner.instagram = body.instagram;
      await patner.save();
      req.flash("message", `Berhasil Mengubah Data Patner`);
      req.flash("messageStatus", "success");
      res.redirect("/admin/patner");
    } else {
      // jika ada foto ktp yang diuplaod
      await fs.unlink(path.join(`public/${patner.imageUrlKtp}`));

      patner.nameOwer = body.nameOwer;
      patner.noNik = body.noNik;
      patner.address = body.address;
      patner.locationStore = body.locationStore;
      patner.noHp = body.noHp;
      patner.nameBrand = body.nameBrand;
      patner.tagline = body.tagline;
      patner.isRequestLogo = body.isRequestLogo;
      patner.color = body.color;
      patner.email = body.email;
      patner.facebook = body.facebook;
      patner.instagram = body.instagram;
      patner.imageUrlKtp = `images/${req.file.filename}`;
      await patner.save();
      req.flash("message", `Berhasil Mengubah Data Patner`);
      req.flash("messageStatus", "success");
      res.redirect("/admin/patner");
    }
  } catch (error) {
    console.log(error);
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner");
  }
};

module.exports = {
  index,
  displayformAdd,
  addData,
  detailPatner,
  displayformEdit,
  editProfilePatner,
};
