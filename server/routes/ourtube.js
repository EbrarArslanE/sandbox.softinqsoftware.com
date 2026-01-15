import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/videoAra", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Sorgu boş olamaz"
      });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(q)}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.log("YT API ERROR:", data.error);
      return res.status(500).json({
        success: false,
        error: data.error
      });
    }

    // 🔥 ORJİNAL YOUTUBE RESPONSE
    res.json({
      success: true,
      items: data.items
    });

  } catch (err) {
    console.error("OURTUBE SEARCH ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

export default router;
