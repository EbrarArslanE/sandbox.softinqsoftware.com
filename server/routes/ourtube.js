import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/videoAra", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ message: "Sorgu parametresi gerekli ?q=" });

    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url =
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(q)}&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Youtube error handling
    if (data.error) {
      console.log("YT ERROR:", data.error);
      return res.status(500).json({ message: "YouTube API Error", error: data.error });
    }

    // sadeleştirilmiş sonuç
    const result = data.items.map(v => ({
      videoId: v.id.videoId,
      title: v.snippet.title,
      description: v.snippet.description,
      thumbnail: v.snippet.thumbnails.high?.url,
      channelTitle: v.snippet.channelTitle
    }));

    res.json({
      success: true,
      count: result.length,
      videos: result
    });

  } catch (err) {
    console.log("Server Error:", err);
    res.status(500).json({ message: "Server Error", error: err });
  }
});

export default router;
