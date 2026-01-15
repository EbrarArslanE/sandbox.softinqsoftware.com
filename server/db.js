import mongoose from "mongoose";
import ora from "ora";

const connectDB = async () => {
  const spinner = ora("MongoDB bağlanıyor...").start();

  try {
    await mongoose.connect("mongodb+srv://ebrar_db_user:Ee1313**@cluster-1.yl9a2yx.mongodb.net/ßßß");

    spinner.succeed("MongoDB bağlantısı başarılı!");
  } catch (err) {
    spinner.fail("MongoDB bağlantısı başarısız!");
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
