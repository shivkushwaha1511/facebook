import express from "express";

const router = express.Router();
import { SignUp, Login } from "../controllers/auth";

// Register login
router.post("/signup", SignUp);
router.post("/login", Login);

module.exports = router;
