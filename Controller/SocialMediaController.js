const SocialMedia = require("../Models/SocialMedia");

const index = async (req, res) => {
  try {
    const data = await SocialMedia.find();
    res.render("admin/social_media", {
      title: "Hello Summer | Sosial Media",
      data: data,
      messages: req.flash("message"),
      messageStatus: req.flash("messageStatus"),
    });
  } catch (error) {
    console.log(error);
  }
};

const addData = async (req, res) => {
  const { username, media } = req.body;
  console.log(username, media);
  try {
    await SocialMedia.create({ username, media });
    req.flash("message", "Berhasil Menambah Data");
    req.flash("messageStatus", "success");
    res.redirect("/admin/social_media");
  } catch (error) {
    req.flash("message", "Gagal Menambah Data");
    req.flash("messageStatus", "error");
    console.log("ini error", error);
    res.redirect("/admin/social_media");
  }
};

const editData = async (req, res) => {
  try {
    const { id, username, media } = req.body;
    const socialMedia = await SocialMedia.findOne({ _id: id });
    socialMedia.username = username;
    socialMedia.media = media;
    await socialMedia.save();
    req.flash("message", "Berhasil Menambah Data");
    req.flash("messageStatus", "success");
    res.redirect("/admin/social_media");
  } catch (error) {
    req.flash("message", "Gagal Mengubah Data");
    req.flash("messageStatus", "error");
    console.log(error);
    res.redirect("/admin/social_media");
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const socialMedia = await SocialMedia.findOne({ _id: id });
    await socialMedia.remove();

    req.flash("message", "Behasil Menghapus Data");
    req.flash("messageStatus", "warning");
    res.redirect("/admin/social_media");
  } catch (error) {
    req.flash("message", "Gagal Menhapus Data");
    req.flash("messageStatus", "error");
    console.log(eror);
    res.redirect("/admin/social_media");
  }
};

module.exports = {
  index,
  addData,
  editData,
  deleteData,
};
