import mongoose from "mongoose";

const OurTubeSchema = new mongoose.Schema({
  queue: {
    type: Array,
    default: [],
  },
  playerState: {
    type: Object,
    default: {
      videoId: null,
      isPlaying: false,
      currentTime: 0,
    },
  },
});

export default mongoose.model("OurTubeState", OurTubeSchema);
