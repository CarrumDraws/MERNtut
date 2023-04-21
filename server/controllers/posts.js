import Post from "../models/Post.js";

// CREATE
// Formats post,
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await user.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find(); // Returns all posts (????)
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ
// Get All Posts
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find(); // Gets ALL posts
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get A User's Posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }); // Gets ALL posts
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
// Likes/Unlikes a Post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // Id of post
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isliked = post.likes.get(userId);

    if (isliked) {
      // Delete userId if liked...
      post.likes.delete(userId);
    } else {
      // ...Add userId if unliked
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
