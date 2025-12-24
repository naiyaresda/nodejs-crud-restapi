import db from "../config/db.js";

// CREATE
export const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "name wajib diisi" });
  }

  const sql = "INSERT INTO categories (name) VALUES (?)";
  db.query(sql, [name.trim()], (err, result) => {
    if (err) return res.status(500).json({ message: err.message || err });
    return res.status(201).json({
      message: "Kategori berhasil dibuat",
      data: { id: result.insertId, name: name.trim() },
    });
  });
};

// READ (LIST)
export const getCategories = (req, res) => {
  const sql = "SELECT * FROM categories ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message || err });
    return res.json({ message: "OK", data: results });
  });
};

// READ (DETAIL)
export const getCategoryById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM categories WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message || err });
    if (results.length === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    return res.json({ message: "OK", data: results[0] });
  });
};

// UPDATE
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "name wajib diisi" });
  }

  const sql = "UPDATE categories SET name = ? WHERE id = ?";
  db.query(sql, [name.trim(), id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message || err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    return res.json({ message: "Kategori berhasil diupdate" });
  });
};

// DELETE
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      // biasanya error kalau ada product yang masih pakai category tsb (RESTRICT)
      return res.status(500).json({ message: err.message || err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    return res.json({ message: "Kategori berhasil dihapus" });
  });
};