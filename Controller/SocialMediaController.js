const SocialMedia = require("../Models/SocialMedia");

const index = async (req, res) => {
  try {
    const data = await SocialMedia.find();
    // console.log(data);
    res.render("admin/social_media", {
      title: "Hello Summer | Sosial Media",
      data: data,
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

    res.redirect("/admin/social_media");
  } catch (error) {
    console.log("ini error", error);
  }
};

const editData = async (req, res) => {
  try {
    const { id, username, media } = req.body;
    const socialMedia = await SocialMedia.findOne({ _id: id });
    socialMedia.username = username;
    socialMedia.media = media;
    await socialMedia.save();
    res.redirect("/admin/social_media");
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const socialMedia = await SocialMedia.findOne({ _id: id });
    await socialMedia.remove();
    res.redirect("/admin/social_media");
  } catch (error) {
    console.log(eror);
  }
};

module.exports = {
  index,
  addData,
  editData,
  deleteData,
};
