import dotenv from "dotenv";
dotenv.config();

import express from "express";
// import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { deleteAkun, getPembayaran, loginUser, postPembelian, tambahUser, updateAkun } from "./routes/toon-routes.js";

const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());

app.post("/api/daftarakun", tambahUser);
app.post("/api/login", loginUser);
app.put("/api/update", updateAkun);
app.delete("/api/delete", deleteAkun);
app.post("/api/tambahpembelian", postPembelian);
app.get("/api/getpembayaran/:id", getPembayaran);

app.listen(3000, () => console.log("Server terhubung....."));

//Login mendapatkan token
// app.post("/api/login")