const express = require("express");

const router = express.Router();

const {
    getBlueprints
} = require("../controllers/blueprintController");

router.get("/", getBlueprints);

module.exports = router;