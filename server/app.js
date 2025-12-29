import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import connectDB from "./db.js";
import User from "./models/DB-KULLANICILAR.js";
import Project from "./models/DB-PROJELER.js";

const app = express();
const PORT = 3000;

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongo
connectDB();

/* ===============================
   FRONTEND
================================ */

// 🔥 ASSETLER
app.use("/assets",express.static(path.join(__dirname, "../app/assets")));
app.use("/app",express.static(path.join(__dirname, "../app")));
app.use("/menu",  express.static(path.join(__dirname, "../app/assets")));
app.use("/template",express.static(path.join(__dirname, "../app/template")));
app.use("/pages",express.static(path.join(__dirname, "../app/template/pages/")));
app.use("/Tanimlar",express.static(path.join(__dirname, "../app/template/pages/Tanimlar")));



// 🔥 LOGIN SAYFASI
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname,"../app/template/login/login.html")
  );
});

app.get("/anasayfa", (req, res) => {
  res.sendFile(
    path.join(__dirname,"../app/template/pages/anasayfa/anasayfa.html")
  );
});

app.get("/Tanimlar/kullaniciTanimlari", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/Tanimlar/kullaniciTanimlari/kullaniciTanimlari.html"));
});

app.get("/Tanimlar/projeTanimlari", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/Tanimlar/projeTanimlari/projeTanimlari.html"));
});


/* ===============================
   API - LEDS
================================ */

// KULLANICI LİSTELE
app.get("/kullanicilar/kullaniciListele", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json([]);
  }
});

app.get("/projeler/projeListele", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json([]);
  }
});

// KULLANICI EKLE
app.post("/kullanicilar/kullaniciEkle", async (req, res) => {
  try {
    const { e_ad_soyad, e_mail, e_sifre, e_durum } = req.body;

    if (!e_ad_soyad || !e_mail || !e_sifre) {
      return res.status(400).json({ hata: "Eksik alan var" });
    }

    const user = await User.create({
      e_ad_soyad,
      e_mail,
      e_sifre,
      e_durum
    });


    res.json(user);
  } catch (err) {
    console.error("User ekleme hatası:", err);
    res.status(500).json({ hata: "Kullanıcı eklenemedi" });
  }
});

// PROJE EKLE
app.post("/projeler/projeEkle", async (req, res) => {
  try {
    const { e_proje_adi, e_proje_turu, e_proje_yetkilisi, e_aciklama, e_baslangic_tarihi, e_bitis_tarihi, e_oncelik, e_durum } = req.body;

    if (!e_proje_adi || !e_proje_yetkilisi || !e_proje_turu || !e_oncelik) {
      return res.status(400).json({ hata: "Eksik alan var" });
    }

    const project = await Project.create({
      e_proje_adi,
      e_proje_turu,
      e_proje_yetkilisi,
      e_aciklama,
      e_baslangic_tarihi,
      e_bitis_tarihi,
      e_oncelik,
      e_durum
    });


    res.json(project);
  } catch (err) {
    console.error("User ekleme hatası:", err);
    res.status(500).json({ hata: "Kullanıcı eklenemedi" });
  }
});

// KULLANICI GÜNCELLE
app.put("/kullanicilar/kullaniciDuzenle/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ hata: "Güncelleme başarısız" });
  }
});

// PROJE GÜNCELLE
app.put("/projeler/projeDuzenle/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ hata: "Güncelleme başarısız" });
  }
});

// KULLANICI SİL
app.delete("/kullanicilar/kullaniciSil/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ hata: "Silme başarısız" });
  }
});
// PROJE SİL
app.delete("/projeler/projeSil/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ hata: "Silme başarısız" });
  }
});

/* ===============================
   TEST
================================ */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend ayakta 🚀 (ESM)" });
});

app.listen(PORT, () => {
  console.clear()
  console.log(`🔥 Server http://localhost:${PORT}`);
});
