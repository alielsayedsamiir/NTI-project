const express = require("express");
const { signup, signin } = require("../controllers/auth-controllers");
const upload = require("../middleware/multer-middleware");

const router = express.Router();

router.post("/signup", upload.single("userImage"), signup);
router.post("/signin", signin);

module.exports = router;