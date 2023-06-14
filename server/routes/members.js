const express = require("express");
const router = express.Router();
import moment from "moment";
import db from "../db";
const validate = require("../validations/members");
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    issuerBaseURL: 'https://dev-e5so586xmispuho0.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

router.get("/", jwtCheck, async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM members");

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

    req.body.dateOfBirth = moment(req.body.dateOfBirth).utcOffset('+0100').format('YYYY-MM-DD');

    try {
        const rs = await db.query(
            "INSERT INTO members (first_name, last_name, gender, date_of_birth, address, post_code, email, mobile, additional_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
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
            ]
        );

        res.json(rs.rows[0].id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;