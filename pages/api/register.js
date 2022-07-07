import bcrypt from "bcrypt";
import { validateUserData } from "../../lib/validateInput";
import { createToken } from "../../lib/createJwtToken";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      validateUserData(req.body);
      let { email, username, password } = req.body;
      username = username.toLowerCase();
      await dbConnect();
      const user = await User.findOne({ $or: [{ email }, { username }] });

      if (user) {
        throw new Error("User with that email or username already exist");
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const createdUser = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      const token = await createToken(createdUser);

      res.status(201).json({ email, username, token, _id: createdUser._id });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Not a valid request type" });
  }
}
