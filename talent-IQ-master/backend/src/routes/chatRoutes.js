import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// ✅ Existing route
router.get("/token", protectRoute, getStreamToken);

// ✅ ADD THIS NEW ROUTE (VERY IMPORTANT)
router.post("/run", protectRoute, async (req, res) => {
  try {
    const { code, language } = req.body;

    // 🔹 For now just return dummy output
    res.json({
      output: `✅ Code executed successfully in ${language}\n\nYour code:\n${code}`,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error running code" });
  }
});

export default router;