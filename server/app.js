import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

//Database importları 
import connectDB from "./db.js";
import User from "./models/DB-KULLANICILAR.js";
import Project from "./models/DB-PROJELER.js";
import Gorevler from "./models/DB-GOREVLER.js";

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

/ =============================== FRONTEND ================================ /

app.use("/assets",express.static(path.join(__dirname, "../app/assets")));
app.use("/app",express.static(path.join(__dirname, "../app")));
app.use("/menu",  express.static(path.join(__dirname, "../app/assets")));
app.use("/template",express.static(path.join(__dirname, "../app/template")));
app.use("/pages",express.static(path.join(__dirname, "../app/template/pages/")));
app.use("/Tanimlar",express.static(path.join(__dirname, "../app/template/pages/Tanimlar")));



// Router Module
app.get("/giris", (req, res) => {
  res.sendFile(path.join(__dirname,"../app/template/login/login.html"));
});

app.get("/anasayfa", (req, res) => {
  res.sendFile(path.join(__dirname,"../app/template/pages/anasayfa/anasayfa.html"));
});
// !Tanımlar
app.get("/Tanimlar/kullaniciTanimlari", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/Tanimlar/kullaniciTanimlari/kullaniciTanimlari.html"));
});

app.get("/Tanimlar/projeTanimlari", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/Tanimlar/projeTanimlari/projeTanimlari.html"));
});

app.get("/Tanimlar/gorevTanimlari", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/Tanimlar/gorevTanimlari/gorevTanimlari.html"));
});

// !Ayarlar
app.get("/ayarlar/sistemAyarlari", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/ayarlar/sistemAyarlari/sistemAyarlari.html"));
});


// !Sosyal
app.get("/sosyal/OurTube", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/template/pages/sosyal/OurTube/OurTube.html"));
});


/=============================== API - LEDS ================================ */


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

app.get("/gorevler/gorevListele", async (req, res) => {
  try {
    const gorevler = await Gorev.find().sort({ createdAt: -1 });
    res.json(gorevler);
  } catch (err) {
    res.status(500).json([]);
  }
});

app.post("/kullanicilar/kullaniciEkle", async (req, res) => {
  try {
    const { e_ad_soyad, e_kullanici_adi, e_mail, e_sifre, e_durum } = req.body;

    if (!e_ad_soyad || !e_kullanici_adi || !e_sifre) {
      return res.status(400).json({ hata: "Eksik alan var" });
    }

    const user = await User.create({
      e_ad_soyad,
      e_mail,
      e_sifre,
      e_kullanici_adi,
      e_durum
    });


    res.json(user);
  } catch (err) {
    console.error("User ekleme hatası:", err);
    res.status(500).json({ hata: "Kullanıcı eklenemedi" });
  }
});

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

app.post("/gorevler/gorevEkle", async (req, res) => {
  try {
    const {
      e_gorev_baslik,
      e_gorev_aciklama,
      e_atanan_kullanici,
      e_olusturan_kullanici,
      e_proje_id,
      e_oncelik,
      e_durum,
      e_baslangic_tarihi,
      e_bitis_tarihi
    } = req.body;


    if (!e_gorev_baslik || !e_atanan_kullanici) {
      return res.status(400).json({ hata: "Zorunlu alanlar eksik" });
    }


    const gorev = await Gorevler.create({
      e_gorev_baslik,
      e_gorev_aciklama,
      e_atanan_kullanici,
      e_olusturan_kullanici,
      e_proje_id,
      e_oncelik,
      e_durum,
      e_baslangic_tarihi,
      e_bitis_tarihi
    });

    return res.status(201).json({
      mesaj: "Görev başarıyla oluşturuldu",
      gorev
    });

  } catch (err) {
    console.error("User ekleme hatası:", err);
    res.status(500).json({ hata: "Kullanıcı eklenemedi" });
  }
});

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

app.put("/gorevler/gorevDuzenle/:id", async (req, res) => {
  try {
    const updated = await Gorevler.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ hata: "Güncelleme başarısız" });
  }
});

app.delete("/kullanicilar/kullaniciSil/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ hata: "Silme başarısız" });
  }
});

app.delete("/projeler/projeSil/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ hata: "Silme başarısız" });
  }
});

app.delete("/gorevler/gorevSil/:id", async (req, res) => {
  try {
    await Gorevler.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Görev silindi" });
  } catch (err) {
    res.status(500).json({ hata: "Silme başarısız" });
  }
});

/* ===============================TEST================================ */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend ayakta 🚀 (ESM)" });
});
/* ===============================TEST================================ */

app.listen(PORT, () => {
  console.clear()
  console.log(`🟢 Server started: http://localhost:${PORT}`);
});
