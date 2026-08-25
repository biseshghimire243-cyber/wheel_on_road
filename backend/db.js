const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bmw_travel",
    port: Number(process.env.DB_PORT) || 3306
});

db.connect((error) => {

    if (error) {
        console.log("❌ MySQL Connection Failed:");
        console.log(error.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully!");
});

module.exports = db;