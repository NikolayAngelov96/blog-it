import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { validateUserData } from "../../lib/validateInput";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const options = {
    expiresIn: "2d",
  };

  const tokenPromise = new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, options, (err, decodedToken) => {
      if (err) {
        reject(err);
      }

      resolve(decodedToken);
    });
  });

  return tokenPromise;
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      validateUserData(req.body);
      const { email, username, password } = req.body;
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

      res.status(201).json({ email, username, token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Not a valid request type" });
  }
}
