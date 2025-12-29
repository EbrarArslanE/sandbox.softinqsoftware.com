import express from "express";
import User from "../models/DB-KULLANICILAR.js";

const router = express.Router();

// ➕ kullanıcı ekle
router.post("/", async (req, res) => {
  try {
    const { e_ad_soyad, e_mail, e_sifre, e_rol, e_durum } = req.body;

    if (!e_ad_soyad || !e_mail || !e_sifre) {
      return res.status(400).json({ hata: "Zorunlu alanlar boş" });
    }

    const user = await User.create({
      e_ad_soyad,
      e_mail,
      e_sifre,
      e_rol,
      e_durum
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ hata: "Kullanıcı eklenemedi" });
  }
});

// 📄 kullanıcı listele
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch {
    res.status(500).json([]);
  }
});

// ✏️ düzenle
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ hata: "Güncelleme başarısız" });
  }
});

// 🗑 sil
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Silindi" });
  } catch {
    res.status(500).json({ hata: "Silme başarısız" });
  }
});

export default router;
