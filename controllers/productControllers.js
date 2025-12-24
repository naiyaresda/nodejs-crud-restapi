import db from "../config/db.js";

// CREATE
export const createProduct = (req, res) => {
  const { category_id, name, price } = req.body;

  if (!category_id) return res.status(400).json({ message: "category_id wajib diisi" });
  if (!name || !name.trim()) return res.status(400).json({ message: "name wajib diisi" });

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: "price harus angka >= 0" });
  }

  // pastikan category ada
  db.query("SELECT id FROM categories WHERE id = ?", [category_id], (err, cat) => {
    if (err) return res.status(500).json({ message: err.message || err });
    if (cat.length === 0) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    const sql = "INSERT INTO products (category_id, name, price) VALUES (?, ?, ?)";
    db.query(sql, [category_id, name.trim(), numericPrice], (err2, result) => {
      if (err2) return res.status(500).json({ message: err2.message || err2 });
      return res.status(201).json({
        message: "Produk berhasil dibuat",
        data: { id: result.insertId, category_id, name: name.trim(), price: numericPrice },
      });
    });
  });
};

// READ (LIST) + join nama kategori biar enak
export const getProducts = (req, res) => {
  const sql = `
    SELECT p.*, c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ORDER BY p.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message || err });
    return res.json({ message: "OK", data: results });
  });
};

// READ (DETAIL)
export const getProductById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT p.*, c.name AS category_name
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.id = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message || err });
    if (results.length === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
    return res.json({ message: "OK", data: results[0] });
  });
};

// UPDATE
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { category_id, name, price } = req.body;

  if (!category_id) return res.status(400).json({ message: "category_id wajib diisi" });
  if (!name || !name.trim()) return res.status(400).json({ message: "name wajib diisi" });

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: "price harus angka >= 0" });
  }

  // pastikan category ada
  db.query("SELECT id FROM categories WHERE id = ?", [category_id], (err, cat) => {
    if (err) return res.status(500).json({ message: err.message || err });
    if (cat.length === 0) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    const sql = `
      UPDATE products
      SET category_id = ?, name = ?, price = ?
      WHERE id = ?
    `;
    db.query(sql, [category_id, name.trim(), numericPrice, id], (err2, result) => {
      if (err2) return res.status(500).json({ message: err2.message || err2 });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
      return res.json({ message: "Produk berhasil diupdate" });
    });
  });
};

// DELETE
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message || err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Produk tidak ditemukan" });
    return res.json({ message: "Produk berhasil dihapus" });
  });
};