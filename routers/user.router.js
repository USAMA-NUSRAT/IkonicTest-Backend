const express = require("express");
const router = express.Router();
const { SignUp, Login } = require("../controllers/user.controller");

router.post("/user/create", SignUp);
router.post("/user/login", Login);

module.exports = router;
