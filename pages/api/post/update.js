import * as jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method == "PUT") {
    try {
      const token = req.headers["x-authorization"];

      const payload = jwt.verify(token, SECRET);

      const { postId, content, published } = req.body;

      await dbConnect();

      const post = await Post.findById(postId);

      if (payload._id != post.owner) {
        throw new Error("You are not authorized to change this post");
      }

      await Post.findByIdAndUpdate(postId, { content, published });

      res.status(200).json({ message: "Successfully updated" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid request type" });
  }
}
