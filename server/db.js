import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/sandboxsoftinq");
    await mongoose.connect("mongodb+srv://ebrar_db_user:Ee1313**@cluster-1.yl9a2yx.mongodb.net/ßßß");
    console.log("🍃 DataBase Bağlantısı Başarılı!");
  } catch (err) {
    console.error("❌ DataBase Bağlantısı Başarısız:", err, "!");
    process.exit(1);
  }
};

export default connectDB;
