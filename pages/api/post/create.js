import * as jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import User from "../../../models/User";

const SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method == "POST") {
    const token = req.headers["x-authorization"];

    try {
      const payload = jwt.verify(token, SECRET);

      const data = JSON.parse(req.body);

      await dbConnect();

      const isSlugTaken = await Post.findOne({ slug: data.slug });

      if (isSlugTaken) {
        throw new Error("Post with that title already exist");
      }

      const user = await User.findById(payload._id);

      const post = await Post.create({ ...data, owner: user._id });

      user.posts.push(post);

      await user.save();

      res.status(201).json({ post });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Not a valid request type" });
  }
}
