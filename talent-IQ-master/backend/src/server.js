import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

// ✅ middleware
app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL, // must match your Vercel URL
    credentials: true,
  })
);

// ✅ Clerk middleware
app.use(clerkMiddleware());

// ✅ Test route (so "/" doesn’t show error)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Health check
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// ✅ routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// ✅ start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port: ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();