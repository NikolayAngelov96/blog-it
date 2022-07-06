import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { postId, userId } = req.body;

      await dbConnect();

      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("No such post in database");
      }

      post.hearts.push(userId);

      await post.save();

      res.status(200).json({ message: "Successfully liked a post" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Not a valid reqest type" });
  }
}
