import OurTubeState from "../models/DB-OURTUBE.js";

export default async function ensureState() {
  let doc = await OurTubeState.findOne();

  if (!doc) {
    await OurTubeState.create({});
    console.log("🔥 OurTube state oluşturuldu");
  } else {
    console.log("🔥 OurTube state zaten var");
  }
}
