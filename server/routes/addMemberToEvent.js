const express = require("express");
const router = express.Router();
import db from "../db";
const validate = require("../validations/addMemberToEvent");
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    issuerBaseURL: 'https://dev-e5so586xmispuho0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

router.post("/", async (req, res) => {
    try {
        await validate(req.body);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

    try {
        let rs = await db.query("SELECT * FROM members WHERE g_id = $1", [req.body.memberId]);
        if (rs.rowCount <= 0) return res.status(404).json({ message: "Member does not exist." });

        const uId = rs.rows[0].id;

        rs = await db.query("SELECT * FROM attendance WHERE u_id = $1", [uId]);
        if (rs.rowCount > 0) return res.status(404).json({ message: "Member already exists in event." });

        rs = await db.query(
            "INSERT INTO attendance (e_id, u_id) VALUES ($1, $2) RETURNING *",
            [
                +req.body.eventId,
                uId
            ]
        );

        res.json({ message: "Member added to event." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;