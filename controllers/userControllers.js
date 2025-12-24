import db from "../config/db.js";

//1. menampilkan data dari tabel
//sql ? SELECT * FROM users
export const getUsers = (req, res) =>{
    db.query("SELECT * FROM users", (err, result) => {
        //jika ada eror
        if (err) res.status(500).json({ message: err });

        //jika berhasil
        res.json(result);
    });
}; 

//2. menyimpan data
//sql ? INSERT INTO  users (name, email, password values (?,?,?)
export const insertUser = (req, res) => {
    const {name, email, password} = req.body;

    db.query(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name, email, password],
        (err, result) => {
            //jika ada eror
            if (err) res.status(500).json({ message: err });

            //jika berhasil
            res.json({ message: "Data berhasil disimpan" });
        }
    );
};


//3. menampilkan data berdasarkan id
//sql ? SELECT * FROM users WHERE id=?
export const showUser = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM users WHERE id=?", [id], (err, result) => {
        //jika ada eror 
        if (err) res.status(500).json({ message: err });

        //jika data tidak ditemukan 
        if (result.length === 0) {
            return res.status(400).json({ message: "User tidak ditemukan" });
        }

        //jika ditemukan 
        res.json(result[0]);
    });
};


//4. update data berdasarkan id
//sql ? UPDATE users SET name=?, email=?, WHERE id=?
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    db.query[
        "UPDATE users SET name=?, email=? WHERE id=?",
        [name, email, id],
        (err, result) => {
            //jika ada eror
            if (err) res.status(500).json({ message: err });

            //jika berhasil
            res.json({ message: "Data berhasil disimpan" });
        }
    ];
};


//5. delete data berdasarkan id
//sql ? DELETE FROM users WHERE id=?
export const deleteUser = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
        //jika ada eror
        if (err) res.status(500).json({ message: err });

        //jika berhasil
        res.json({ message: "Data berhasil dihapus" });
    });
};