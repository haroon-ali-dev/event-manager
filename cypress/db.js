const { Pool } = require('pg');
const { readFileSync } = require('fs');
require('dotenv').config();

const pool = new Pool({
	host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const members = readFileSync('./data/members.sql').toString();
const events = readFileSync('./data/events.sql').toString();

async function seed() {
    await pool.query('TRUNCATE TABLE members RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');
    await pool.query('TRUNCATE TABLE attendance RESTART IDENTITY');

    await pool.query(members);
    await pool.query(events);

    // await pool.query('');
}

module.exports.seed = seed;