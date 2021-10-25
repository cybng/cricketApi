const express = require("express");
const router = express.Router();
const {addagent,getagent} = require("../controller/agent/Agent");

router.post("/addagent",addagent);
router.get("/getagent",getagent);

module.exports = router;