import * as jwt from "jsonwebtoken";

import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const token = req.headers["x-authorization"];

      const payload = jwt.verify(token, SECRET);

      const { postId } = req.body;

      await dbConnect();

      const post = await Post.findById(postId).lean();

      const isOwner = post.owner == payload._id;

      if (!isOwner) {
        throw new Error("You are not authorized to delete this post");
      }

      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: "Successful deletion" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid request type" });
  }
}
