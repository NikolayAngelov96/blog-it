import * as jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method == "POST") {
    const token = req.headers["x-authorization"];
    try {
      const payload = jwt.verify(token, SECRET);

      const data = JSON.parse(req.body);

      const { postId, content, published } = data;

      await dbConnect();

      await Post.findByIdAndUpdate(postId, { content, published });

      res.status(200).json({ message: "Successfully updated" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid request type" });
  }
}
