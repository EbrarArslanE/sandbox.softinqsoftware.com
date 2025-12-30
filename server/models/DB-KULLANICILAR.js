import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    e_ad_soyad: {
      type: String,
      required: true,
      trim: true
    },
    e_mail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    e_sifre: {
      type: String,
      required: true
    },
    e_kullanici_adi: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    e_durum: {
      type: String,
      enum: ["aktif", "pasif"],
      default: "aktif"
    }
  },
);

export default mongoose.model(
  "User",
  UserSchema,
  "DB_KULLANICILAR_L"
);