import { compare, hashedPassword } from "../helpers";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Checking user exists or not
    const user = await User.findOne({ email })
      .populate("requests", "_id name")
      .populate("friends", "_id name");
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

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const friends = user.friends;
    const requests = user.requests;
    friends.push(...requests, user._id);

    const people = await User.find({ _id: { $nin: friends } }).select(
      "-password"
    );
    // .limit(10);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};

export const addRequest = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { requests: req.user._id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

// Add friend to requested user
// As middleware
export const acceptRequest = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { friends: req.user._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

// Add friend to current user
export const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { friends: req.body._id },
        $pull: { requests: req.body._id },
      },
      { new: true }
    ).select("-password -secret");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("requests", "_id name")
      .populate("friends", "_id name")
      .select("-password");

    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { requests: req.body._id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

// remove friend to requested user
// As middleware
export const unfriend = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { friends: req.user._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

// remove friend to current user
export const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { friends: req.body._id },
      },
      { new: true }
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
