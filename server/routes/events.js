const express = require("express");
const router = express.Router();
import db from "../db";

router.get("/", async (req, res) => {
    res.send("ok");
});

module.exports = router;