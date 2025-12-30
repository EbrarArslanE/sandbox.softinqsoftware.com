import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sandboxsoftinq");
    console.log("🍃 DataBase Bağlantısı Başarılı!");
  } catch (err) {
    console.error("❌ DataBase Bağlantısı Başarısız:", err, "!");
    process.exit(1);
  }
};

export default connectDB;
