const express = require("express");
const router = express.Router();
import moment from "moment";
import db from "../db";
const validate = require("../validations/members");
const { auth } = require("express-oauth2-jwt-bearer");
import { nanoid } from "nanoid";
const uniqueId = nanoid(10);

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    issuerBaseURL: "https://dev-e5so586xmispuho0.us.auth0.com/",
    tokenSigningAlg: "RS256",
});

router.get("/", jwtCheck, async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM members ORDER BY first_name");

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/email/:email", jwtCheck, async (req, res) => {
    try {
        const dbRes = await db.query("SELECT * FROM members WHERE email = $1", [req.params.email]);

        if (dbRes.rowCount <= 0) return res.status(404).json({ message: "Member doesn't exist." });

        res.json(dbRes.rows[0]);
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

    req.body.dateOfBirth = moment(req.body.dateOfBirth).utcOffset("+0100").format("YYYY-MM-DD");
    const member_since = moment().utcOffset("+0100").format("YYYY-MM-DD");


    try {
        const rs = await db.query(
            "INSERT INTO members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info, member_since, created_by, g_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [
                req.body.firstName,
                req.body.lastName,
                req.body.gender,
                req.body.dateOfBirth,
                req.body.address,
                req.body.postCode,
                req.body.email,
                req.body.mobile,
                req.body.additionalInfo,
                member_since,
                req.body.userName,
                uniqueId,
            ]
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
        let rs = await db.query("SELECT * FROM members WHERE id = $1", [req.params.id]);
        if (rs.rowCount <= 0) {
            return res.status(404).json({ message: "Member does not exist." });
        }

        req.body.dateOfBirth = moment(req.body.dateOfBirth).utcOffset("+0100").format("YYYY-MM-DD");

        rs = await db.query(
            "UPDATE members SET first_name = $1, last_name = $2, gender = $3, date_of_birth = $4, address = $5, post_code = $6, email = $7, mobile = $8, additional_info = $9 WHERE id = $10 RETURNING *",
            [
                req.body.firstName,
                req.body.lastName,
                req.body.gender,
                req.body.dateOfBirth,
                req.body.address,
                req.body.postCode,
                req.body.email,
                req.body.mobile,
                req.body.additionalInfo,
                req.params.id,
            ]
        );

        res.json(rs.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let rs = await db.query("SELECT * FROM members WHERE id = $1", [req.params.id]);
        if (rs.rowCount <= 0) {
            return res.status(404).json({ message: "Member does not exist." });
        }

        await db.query("DELETE FROM members WHERE id = $1", [req.params.id]);

        res.send("ok");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;