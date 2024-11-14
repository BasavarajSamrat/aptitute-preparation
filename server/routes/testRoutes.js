const express = require("express");
const { getAllTests } = require("../controllers/testController");

const router = express.Router();

router.get("/", getAllTests);

module.exports = router;
