const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");

// POST /applications
router.post("/", applicationController.createApplication);

module.exports = router;