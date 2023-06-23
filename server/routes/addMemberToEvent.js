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

router.post("/", jwtCheck, async (req, res) => {
    
});

module.exports = router;