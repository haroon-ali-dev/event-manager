const express = require("express");
const router = express.Router();
import db from "../db";

router.get("/", async (req, res) => {
    res.json("ok");
});

module.exports = router;