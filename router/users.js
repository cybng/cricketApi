const express = require("express");
const router = express.Router();
const userModal=require("../modal/auth/userModal");
const {login} = require("../controller/auth/Auth");

 router.post("/login",login);


module.exports = router;