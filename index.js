import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { deleteAkun, getPembayaran, historyData, loginUser, postPembelian, tambahUser, updateAkun } from "./routes/toon-routes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
    if (
      req.path === "/api/login" ||
      req.path.includes("daftar") ||
      req.path.endsWith(".css") ||
      req.path.endsWith(".jpg") ||
      req.path.endsWith(".png") ||
      req.path.endsWith(".js")
    ) {
      next();
    } else {
      let authorized = false;
      if (req.cookies.token) {
        try {
          jwt.verify(req.cookies.token, process.env.SECRET_KEY);
          authorized = true;
        } catch (err) {
          res.setHeader("Cache-Control", "no-store");
          res.clearCookie("token");
        }
      }
      if (authorized) {
        if (
          req.path === "/" ||
          req.path.includes("daftar")
        ) {
          res.redirect("/beranda/beranda.html");
        } else {
          next();
        }
      } else {
        if (req.path === "/") {
          next();
        } else {
          if (req.path.startsWith("/api")) {
            res.status(401);
            res.send("Anda harus login terlebih dahulu.");
          } else {
            res.redirect("/");
          }
        }
      }
    }
  });
  
  import path from "path";
  import { fileURLToPath } from "url";
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "public")));

app.post("/api/daftarakun", tambahUser);
app.post("/api/login", loginUser);
app.put("/api/update", updateAkun);
app.delete("/api/delete", deleteAkun);
app.post("/api/tambahpembelian", postPembelian);
app.get("/api/getpembayaran", getPembayaran);
app.get("/api/history", historyData);

app.listen(3000, () => console.log("Server terhubung....."));

//Login mendapatkan token
// app.post("/api/login")