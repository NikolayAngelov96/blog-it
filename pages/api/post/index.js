import * as jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method == "GET") {
    const token = req.headers["x-authorization"];

    try {
      const payload = jwt.verify(token, SECRET);

      await dbConnect();

      const posts = await Post.find({ owner: payload._id })
        .populate("owner")
        .sort({ createdAt: -1 });

      res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid reqest type" });
  }
}
