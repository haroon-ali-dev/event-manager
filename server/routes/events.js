const express = require("express");
const router = express.Router();
import moment from "moment";
import db from "../db";
const validate = require("../validations/events");
const { auth } = require("express-oauth2-jwt-bearer");
const _ = require("lodash");

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://d3n27sahgwxchw.cloudfront.net/",
    issuerBaseURL: "https://dev-e5so586xmispuho0.us.auth0.com/",
    tokenSigningAlg: "RS256",
});

router.get("/", jwtCheck, async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM events ORDER BY date DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/date/:date", jwtCheck, async (req, res) => {
    try {
        const dbRes = await db.query("SELECT * FROM events WHERE date = $1", [req.params.date]);

        res.json(dbRes.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/upcoming", jwtCheck, async (req, res) => {
    try {
        const currentDate = moment().format("YYYY-MM-DD");
        const query = `
        SELECT e.id, e.name, e.date, e.information, COUNT(a.u_id) AS "checkedInCount"
        FROM events e
        LEFT JOIN attendance a ON a.e_id = e.id
        WHERE e.date > $1
        GROUP BY e.id, e.name, e.date, e.information
        ORDER BY e.date ASC;
      `;
        const { rows } = await db.query(query, [currentDate]);
        res.json(rows);
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
        await validate(req.body.new);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        let rs = await db.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
        if (rs.rowCount <= 0) {
            return res.status(404).json({ message: "Event does not exist." });
        }

        req.body.original["date"] = moment(req.body.original["date"]).utcOffset("+0100").format("YYYY-MM-DD");
        rs.rows[0]["date"] = moment(rs.rows[0]["date"]).utcOffset("+0100").format("YYYY-MM-DD");

        if (!_.isEqual(req.body.original, rs.rows[0])) return res.status(400).json({ message: "Event has already been modifed. Please reload the page and try again." });

        req.body.new.date = moment(req.body.new.date).utcOffset("+0100").format("YYYY-MM-DD");

        rs = await db.query(
            "UPDATE events SET name = $1, date = $2, information = $3 WHERE id = $4 RETURNING *",
            [req.body.new.name, req.body.new.date, req.body.new.information, req.params.id]
        );

        res.json(rs.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", jwtCheck, async (req, res) => {
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