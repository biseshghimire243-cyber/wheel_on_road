const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = mysql.createPool({

    host: process.env.DB_HOST || "localhost",

    user: process.env.DB_USER || "root",

    password: process.env.DB_PASSWORD || "",

    database: process.env.DB_NAME || "bmw_travel",

    port: process.env.DB_PORT || 3306,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


/* =========================
   TEST DATABASE CONNECTION
========================= */

pool.getConnection((error, connection) => {

    if (error) {

        console.error(
            "❌ MySQL Connection Failed:"
        );

        console.error(error.message);

        return;
    }


    console.log(
        "✅ MySQL Connected Successfully"
    );


    connection.release();

});


module.exports = pool;