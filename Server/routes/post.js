import express from "express";
import formidable from "express-formidable";

import {
  imageUpload,
  createPost,
  communityPost,
  userPost,
  deletePost,
  totalPost,
} from "../controllers/post";
import { requireSignin } from "../middlewares";
const router = express.Router();

router.post(
  "/image-upload",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  imageUpload
);
router.post("/create-post", requireSignin, createPost);
router.get("/community-posts/:page", requireSignin, communityPost);
router.get("/user-posts", requireSignin, userPost);
router.get("/total-post/:_id", totalPost);

router.delete("/delete-post/:_id", requireSignin, deletePost);

module.exports = router;
