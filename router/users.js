const express = require("express");
const router = express.Router();
const userModal=require("../modal/auth/userModal");
const {login,reg} = require("../controller/auth/Auth");

 router.post("/login",login);
 router.post("/reg",reg)


module.exports = router;