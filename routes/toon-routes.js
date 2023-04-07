import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { client } from "../db.js";

export async function tambahUser(req, res) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `INSERT INTO user_data (nama_lengkap, email, password_) VALUES
            ('${req.body.namaLengkap}', '${req.body.email}', '${hash}')
        `
  );
  res.send("Daftar akun berhasil");
}

export async function loginUser(req, res) {
  const cekEmail = await client.query(
    `SELECT * FROM user_data WHERE email = '${req.body.email}'`
  );
  if (cekEmail.rows.length > 0) {
    if (await bcrypt.compare(req.body.password, cekEmail.rows[0].password_)) {
      const token = jwt.sign(cekEmail.rows[0], process.env.SECRET_KEY);
      res.cookie("token", token);
      res.send("Login berhasil");
    } else {
      res.status(401);
      res.send("Kata sandi salah");
    }
  } else {
    res.status(401);
    res.send("Username salah");
  }
}

export async function updateAkun(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `UPDATE user_data SET email='${req.body.email}', password_ = '${hash}' WHERE id= ${user.id}`
  );
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.send("Akun berhasil di update.");
}

export async function deleteAkun(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  await client.query(`DELETE FROM pembelian WHERE id= ${user.id}`);
  await client.query(`DELETE FROM user_data WHERE id = ${user.id}`);
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.send("Akun berhasil didelete");
}

export async function postPembelian(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  const a = req.body.harga;
  const z = req.body.beliBerapa;
  const total = a * z;
  await client.query(
    `INSERT INTO pembelian (nama_pembeli, no_hp, email, harga, message, id) VALUES  ('${req.body.namaLengkap}', '${req.body.noHp}', '${req.body.email}', ${total}, '${req.body.message}',  ${user.id})`
  );
  res.send("pembelian berhasil.");
}

export async function getPembayaran(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  const getPembayarann = await client.query(
    `SELECT nama_pembeli, no_hp, email, harga FROM pembelian WHERE id = ${user.id}` 
  );
  res.send(getPembayarann.rows[0]);
}
