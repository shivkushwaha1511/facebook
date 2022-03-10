import express from "express";
import formidable from "express-formidable";

import { imageUpload } from "../controllers/post";
const router = express.Router();

router.post(
  "/image-upload",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  imageUpload
);

module.exports = router;
