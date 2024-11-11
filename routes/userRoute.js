import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerControl,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//Routers
const router = express.Router();
//regiter
router.post("/register", registerControl);
//login
router.post("/login", loginController);
//test
router.get("/test", requireSignIn, isAdmin, testController);
//Forgot-password
router.post("/forgot-password", forgotPasswordController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.post("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);


export default router;