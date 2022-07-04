import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (user) => {
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
