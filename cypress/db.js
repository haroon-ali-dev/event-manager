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
    const client = await pool.connect();

    let result;

    try {
        await client.query("BEGIN");

        await client.query('TRUNCATE TABLE members RESTART IDENTITY CASCADE');
        await client.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');
        await client.query('TRUNCATE TABLE attendance RESTART IDENTITY');

        await client.query(members);
        await client.query(events);

        await client.query("COMMIT");

        result = "ok";
    } catch (error) {
        await client.query('ROLLBACK');
        result = "error";
    } finally {
        client.release();
        return result;
    }
}

module.exports.seed = seed;