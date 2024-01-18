const { Pool } = require("pg")
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
})

const q = async (sql, params) => {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(sql, params)
        return rows
    } catch (err) {
        console.log("DB Connection error: ", err)
    } finally {
        client.release()
    }
}

module.exports = { q }