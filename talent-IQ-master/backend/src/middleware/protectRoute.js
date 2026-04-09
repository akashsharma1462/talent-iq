import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const auth = req.auth(); // ✅ correct method
      const clerkId = auth?.userId;

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const email =
        auth?.sessionClaims?.email ||
        `${clerkId}@temp.com`;

      const name =
        auth?.sessionClaims?.name || "User";

      // ✅ ATOMIC OPERATION (NO DUPLICATE ERROR)
      const user = await User.findOneAndUpdate(
        { clerkId }, // find condition
        {
          $setOnInsert: {
            clerkId,
            email,
            name,
            profileImage: "",
          },
        },
        {
          new: true,
          upsert: true, // create if not exists
        }
      );

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];