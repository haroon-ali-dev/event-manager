const express = require("express");
const router = express.Router();
import db from "../db";
const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
    audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "",
    issuerBaseURL: "https://dev-e5so586xmispuho0.us.auth0.com/",
    tokenSigningAlg: "RS256",
});
router.get("/",jwtCheck, async (req, res) => {
      try {
          const { rows } = await db.query("SELECT * FROM events");

          res.json(rows);
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
});

module.exports = router;