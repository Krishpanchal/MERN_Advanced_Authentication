const express = require("express");
const app = require("../app");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.route("/").get(authController.protect, userController.getAllUsers);
router.route("/:id").get(authController.protect, userController.getUser);

module.exports = router;
