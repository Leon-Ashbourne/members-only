const Pool = require("pg").Pool;
const dotenv = require("dotenv");
const process = require("node:process");

dotenv.config();
const { DB_URL } = process.env;

module.exports = new Pool({
    connectionString: DB_URL
})


