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

const getAllData = async (req, res) => {
  try {
    const data = await SocialMedia.find();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  index,
  addData,
};
