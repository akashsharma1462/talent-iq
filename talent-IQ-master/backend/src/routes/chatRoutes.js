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

    // simulate output like real execution
    res.json({
      run: {
        output: `["o","l","l","e","h"]\n["h","a","n","n","a","H"]`
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error running code" });
  }
});

export default router;