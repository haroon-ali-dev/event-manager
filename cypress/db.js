const { Pool } = require('pg');
const { readFileSync } = require('fs');
const moment = require('moment');
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

        const plus3months = moment().add('3', 'months').format("YYYY-MM-DD");
        await client.query('UPDATE events SET date = $1 WHERE id = $2', [plus3months, 1]);

        await client.query('INSERT INTO attendance (e_id, u_id) VALUES($1, $2)', [1, 5]);

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