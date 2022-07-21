import * as jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";
import Post from "../../../models/Post";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Invalid method" });
  }

  try {
    const token = req.headers["x-authorization"];

    const payload = jwt.verify(token, SECRET);

    const { content, postId } = req.body;

    if (!content || !postId) {
      throw new Error("All fields are required");
    }

    await dbConnect();

    const comment = await Comment.create({
      content,
      owner_username: payload.username,
      owner_avatar: payload.avatar,
    });

    const post = await Post.findById(postId);

    post.comments.push(comment._id.toString());

    await post.save();

    res.status(201).json({ comment });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}
