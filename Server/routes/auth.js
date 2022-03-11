import express from "express";

const router = express.Router();
import {
  signUp,
  login,
  findPeople,
  addRequest,
  acceptRequest,
  addFriend,
  getUser,
  rejectRequest,
  unfriend,
  removeFriend,
} from "../controllers/auth";
import { requireSignin } from "../middlewares";

// Register login
router.post("/signup", signUp);
router.post("/login", login);

router.get("/find-people", requireSignin, findPeople);
router.get("/current-user", requireSignin, getUser);

//Friend Request
router.put("/send-request", requireSignin, addRequest);
router.put("/accept-request", requireSignin, acceptRequest, addFriend);
router.put("/reject-request", requireSignin, rejectRequest);

router.put("/remove-friend", requireSignin, unfriend, removeFriend);
module.exports = router;
