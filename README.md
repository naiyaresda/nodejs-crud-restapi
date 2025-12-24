
## README.md*

md
# REST API CRUD – Node.js & MySQL

**Nama: Naiya Resda Novalia
  NIM: 24090073
  Kelas: 3C**

## Tentang Project
Aplikasi ini dibuat sebagai implementasi REST API CRUD menggunakan Node.js dan database MySQL.  
Data yang dikelola terdiri dari kategori produk dan produk, di mana setiap produk terhubung dengan satu kategori.

Project dibuat dengan struktur sederhana agar mudah dipahami dan dijalankan.

## Stack yang Digunakan
- JavaScript (Node.js)
- Express.js
- MySQL
- dotenv
- nodemon

## Struktur Folder
- config/db.js = koneksi database
- controllers/categoryController.js, productController.js, userController.js = logika CRUD
- node_modules = Tempat semua dependensi project Node.js disimpan
- routes/categoryRoutes.js, productRoutes.js, userRoutes.js = penentu URL dan aksi apa yang dijalankan saat request masuk.
- env = .env adalah tempat menyimpan konfigurasi dan data sensitif agar tidak ditulis langsung di kode.
- package-lock.json = package-lock.json mengunci versi dependensi agar hasil instalasi selalu konsisten di semua environment.
- package.json = package.json adalah identitas dan pusat konfigurasi project yang mendefinisikan dependensi, script, dan metadata aplikasi.
- server.js = server.js adalah titik awal aplikasi yang menyiapkan server Express, memuat konfigurasi, dan menghubungkan semua routes agar API bisa berjalan.

## Setup Environment
Buat file .env :

PORT=3000
DB_HOST= localhost
DB_USER= root
DB_PASS=
DB_NAME= project crud

## Menjalankan Aplikasi
bash
npm install
npm run dev

Akses server:
http://localhost:3000

## Daftar Endpoint
# Category
POST /categories
GET /categories
GET /categories/:id
PUT /categories/:id
DELETE /categories/:id

# Product
POST /products
GET /products
GET /products/:id
PUT /products/:id
DELETE /products/:id

## Testing
Testing dilakukan menggunakan Postman dengan mencoba:
Create data
Read data (list & detail)
Update data
Delete data
Bukti pengujian berupa screenshot disertakan dalam repository.

## Penutup
Project REST API ini berhasil dibuat dan dijalankan sesuai dengan ketentuan tugas.
