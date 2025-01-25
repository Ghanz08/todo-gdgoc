const mysql = require('mysql2');
require('dotenv').config();

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}/${process.env.MYSQLDATABASE}`;
const pool = mysql.createPool(urlDB);

// Convert pool to use promises
const promisePool = pool.promise();

module.exports = promisePool;