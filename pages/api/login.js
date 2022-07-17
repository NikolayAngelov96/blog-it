import bcrypt from "bcrypt";
import User from "../../models/User";
import { createToken } from "../../lib/createJwtToken";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("All fields are required");
      }

      await dbConnect();

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User with that email doesn't exist");
      }

      const isAuthenticated = await bcrypt.compare(password, user.password);

      if (!isAuthenticated) {
        throw new Error("Invalid email or password");
      }

      const token = await createToken(user);

      res
        .status(200)
        .json({
          email,
          token,
          username: user.username,
          _id: user._id,
          avatar: user.avatar || "",
        });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Not a valid request type" });
  }
}
