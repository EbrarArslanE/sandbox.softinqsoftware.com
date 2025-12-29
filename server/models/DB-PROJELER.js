import mongoose from "mongoose";

const projeSchema = new mongoose.Schema(
  {
    e_proje_adi: {
      type: String,
      required: true,
      trim: true
    },
    e_proje_turu: {
      type: String,
      required: true,
      lowercase: true,
      // unique genelde gereksiz, birden fazla aynı tür proje olabilir
      // unique: true
    },
    e_proje_yetkilisi: {
      type: String,
      required: true,
      trim: true
    },
    e_durum: {
      type: String,
      enum: ["aktif", "pasif"],
      default: "aktif"
    },
    e_aciklama: { // Proje hakkında açıklama
      type: String,
      trim: true
    },
    e_baslangic_tarihi: {
      type: Date,
      default: Date.now
    },
    e_bitis_tarihi: {
      type: Date
    },
    e_oncelik: {
      type: String,
      enum: ["dusuk", "orta", "yuksek"],
      default: "orta"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Proje",
  projeSchema,
  "DB_L_PROJELER"
);
