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
  const body = req.body;
  try {
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
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner/edit/" + body.id);
  }
};

const resetPasswordPatner = async (req, res) => {
  const { id, passwordOld, passwordNew, confPasswordNew } = req.body;
  try {
    // compare conf password new
    if (passwordNew === confPasswordNew) {
      const patner = await Patner.findOne({ _id: id });
      // cek password old
      const match = await bcrypt.compare(passwordOld, patner.password);
      if (match) {
        // generate hash
        const hash = bcrypt.hashSync(passwordNew, saltRounds);
        // change password and saveto db
        patner.password = hash;
        await patner.save();
        // notif if success
        req.flash(
          "message",
          `Berhasil Merubah Password Patner yang Bernama ${patner.nameOwner}`
        );
        req.flash("messageStatus", "success");
        res.redirect("/admin/patner");
      } else {
        req.flash("message", `Password Lama Salah`);
        req.flash("messageStatus", "danger");
        res.redirect("/admin/patner/edit/" + id);
      }
    } else {
      req.flash("message", `Password Baru Tidak Sama`);
      req.flash("messageStatus", "danger");
      res.redirect("/admin/patner/edit/" + id);
    }
  } catch (error) {
    console.log(error);
    req.flash("message", `Error: ${error.message}`);
    req.flash("messageStatus", "danger");
    res.redirect("/admin/patner/edit/" + id);
  }
};

const deletePatner = async (req, res) => {
  try {
    const { id } = req.params;
    // Ambil data paster dari db
    const patner = await Patner.findOne({ _id: id });
    // hapus image Ktp dari folder
    await fs.unlink(path.join(`public/${patner.imageUrlKtp}`));

    // cek jika patner memiliki gambar profile
    if (patner.imagesUrlId.length > 0) {
      // TODO loop image array
      // 1. delete image on folder
      // 2. find image on db
      // 3. delete image on db
    }
    // cek jika patner punya product
    if (patner.productId.length > 0) {
      // TODO loop product
      // delete all image product
      // delete product
    }
    await patner.remove();
    req.flash(
      "message",
      `Berhasil Menghapus Data Patner Dengan Nama: ${patner.nameOwner}`
    );
    req.flash("messageStatus", "warning");
    res.redirect("/admin/patner");
  } catch (error) {
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
  resetPasswordPatner,
  deletePatner,
};
