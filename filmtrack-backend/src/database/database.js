import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  uri: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
