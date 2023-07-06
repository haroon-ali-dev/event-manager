const express = require("express");
const router = express.Router();
import moment from "moment";
import db from "../db";
const validate = require("../validations/events");
const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    issuerBaseURL: "https://dev-e5so586xmispuho0.us.auth0.com/",
    tokenSigningAlg: "RS256",
});

router.get("/", jwtCheck, async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM events");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/date/:date", async (req, res) => {
    try {
        const dbRes = await db.query("SELECT * FROM events WHERE date = $1", [req.params.date]);

        res.json(dbRes.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", jwtCheck, async (req, res) => {
    try {
        await validate(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    req.body.date = moment(req.body.date).utcOffset("+0100").format("YYYY-MM-DD");

    try {
        const rs = await db.query(
            "INSERT INTO events (name, date, information, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
            [req.body.name, req.body.date, req.body.information, req.body.userName]
        );

        res.json(rs.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", jwtCheck, async (req, res) => {
    try {
        await validate(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        let rs = await db.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
        if (rs.rowCount <= 0) {
return res.status(404).json({ message: "Event does not exist." });
}

        req.body.date = moment(req.body.date).utcOffset("+0100").format("YYYY-MM-DD");

        rs = await db.query(
            "UPDATE events SET name = $1, date = $2, information = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.date, req.body.information, req.params.id]
        );

        res.json(rs.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let rs = await db.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
        if (rs.rowCount <= 0) {
return res.status(404).json({ message: "Event does not exist." });
}

        await db.query("DELETE FROM events WHERE id = $1", [req.params.id]);

        res.send("ok");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
