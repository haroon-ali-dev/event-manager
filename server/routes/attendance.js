const express = require("express");
const router = express.Router();
import db from "../db";
const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    issuerBaseURL: "https://dev-e5so586xmispuho0.us.auth0.com/",
    tokenSigningAlg: "RS256",
});

router.get("/member/:id", async (req, res) => {
    const memberId = +req.params.id;

    try {
        const query = `
            SELECT e.name, e.date
            FROM attendance a
            INNER JOIN events e
            ON a.e_id = e.id
            WHERE a.u_id = $1
        `;

        const { rows } = await db.query(query, [memberId]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/event/:id", async (req, res) => {
    const memberId = +req.params.id;

    try {
        const query = `
            SELECT e.name, e.date
            FROM attendance a
            INNER JOIN events e
            ON a.e_id = e.id
            WHERE a.u_id = $1
        `;

        const { rows } = await db.query(query, [memberId]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;