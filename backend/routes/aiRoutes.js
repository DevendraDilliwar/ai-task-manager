const express = require("express");
const { generateResponse } = require("../controllers/aiController");

const router = express.Router();

router.get("/generate-task", generateResponse);

module.exports = router;
