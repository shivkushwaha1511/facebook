import { compare, hashedPassword } from "../helpers";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  if (!password || password.length < 6) {
    return res.json({
      error: "Password is required and must 6 characters long",
    });
  }

  // Email exists?
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email is taken",
    });
  }
  const hashed = await hashedPassword(password);
  // Creating model Obj.
  const user = new User({
    name,
    email,
    password: hashed,
  });
  try {
    await user.save();
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("Register failed=>", err);
    return res.json({
      error: "Error! Try Again",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Checking user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    //checking password
    const match = await compare(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }

    //Generating token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //We not want to expose password & secret
    user.password = undefined;

    //sending response
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Error! Try again",
    });
  }
};
