const mysql = require('mysql2');

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}/${process.env.MYSQLDATABASE}`;
const pool = mysql.createPool(urlDB);

const promisePool = pool.promise();

module.exports = promisePool;