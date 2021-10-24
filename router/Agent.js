const express = require("express");
const router = express.Router();
const {addagent} = require("../controller/agent/Agent");

router.post("/addagent",addagent)

module.exports = router;