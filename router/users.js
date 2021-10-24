const express = require("express");
const router = express.Router();
const userModal=require("../modal/auth/userModal");
const {validReg,isValid} = require("../validation/Auth")
const {login,reg} = require("../controller/auth/Auth");

 router.post("/login",login);
 router.post("/reg",validReg,isValid,reg);


module.exports = router;