const express = require("express");
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");
const upload = require("../utils/fileUpload");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authenticateToken, userController.getProfile);
router.put("/profile", authenticateToken, userController.updateProfile);
router.put("/profile/picture", authenticateToken, upload.single("profile_picture"), userController.updateProfilePicture);
router.put("/profile/password", authenticateToken, userController.updatePassword);

module.exports = router;