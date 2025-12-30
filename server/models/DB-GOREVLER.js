import mongoose from "mongoose";

const GorevlerSchema = new mongoose.Schema(
  {
    e_gorev_baslik: {
      type: String,
      required: true,
      trim: true
    },

    e_gorev_aciklama: {
      type: String,
      trim: true
    },

    e_atanan_kullanici: {
      type: String,
      required: true,
      trim: true
    },

    e_proje_id: {
      type: String,
      required: true,
      trim: true
    },

    e_oncelik: {
      type: String,
      enum: ["Düşük", "Orta", "Yüksek", "Kritik"],
      default: "orta"
    },

    e_durum: {
      type: String,
      enum: ["Beklemede", "Devam Ediyor", "Tamamlandı", "İptal"],
      default: "beklemede"
    },

    e_baslangic_tarihi: {
      type: Date,
      default: Date.now
    },

    e_bitis_tarihi: {
      type: Date
    },

    e_olusturan_kullanici: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt otomatik
  }
);

export default mongoose.model(
  "Gorevler",
  GorevlerSchema,
  "DB_GOREVLER_L"
);
