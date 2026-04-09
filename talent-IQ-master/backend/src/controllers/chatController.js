import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = chatClient.createToken(userId);

    res.status(200).json({
      token,
      userId,
    });
  } catch (error) {
    console.log("Error in getStreamToken:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}