import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//perintah koneksi
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

//jalankan koneksi database
db.connect((err) => {
    //jika ada err
    if (err) {
        console.log("Eror koneksi database", err);
        return;
    }

    //jika berhasil
    console.log("Mysql berhasil connect!");
});

export default db;