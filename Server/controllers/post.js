import cloudinary from "cloudinary";
import Post from "../models/post";
import User from "../models/user";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//save image and return image url and public id
export const imageUpload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    // console.log(result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  const { postContent, image } = req.body;

  if (!postContent) {
    return res.json({
      error: "Description is required",
    });
  }

  try {
    const post = new Post({ postContent, image, postedBy: req.user._id });
    await post.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const communityPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let friends = user.friends;
    friends.push(user._id);

    // Pagination
    const currentPage = req.params.page || 1;
    const perPage = 5;

    const posts = await Post.find({ postedBy: friends })
      .skip((currentPage - 1) * perPage)
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(perPage);

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const userPost = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    // Delete from cloudinary
    if (post.image && post.image.public_id) {
      cloudinary.uploader.destroy(post.image.public_id);
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

// Total posts
export const totalPost = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    const friends = user.friends;
    friends.push(user._id);
    const posts = await Post.find({
      postedBy: { $in: friends },
    });
    res.json(posts.length);
  } catch (err) {
    console.log(err);
  }
};
