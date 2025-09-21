import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import session from "express-session";
import passport from "passport";
import "./auth/passport.js";
import petsRouter from "./routers/petsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import vaccinationsRouter from "./routers/vaccinationsRouter.js";
import authRouter from "./routers/authRoutes.js";

import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV = "development", GOOGLE_CLIENT_SECRET = "dev-change-me" } = process.env;

const isProd = NODE_ENV === "production";

const allowedOrigins = ["http://localhost:3000", "https://petpass404.netlify.app", "https://petpass-fulf.onrender.com", "http://localhost:8000"];

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "sid",
    secret: GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const uploadsRoot = path.join(process.cwd(), "uploads");
const petUploads = path.join(uploadsRoot, "pets");
fs.mkdirSync(petUploads, { recursive: true });
app.use("/uploads", express.static(uploadsRoot));

app.get("/", (req, res) => {
  res.send("Welcome to Pet Pass");
});

app.use(authRouter);

app.use(petsRouter);
app.use(usersRouter);
app.use("/api", vaccinationsRouter);

app.use((err, req, res) => {
  console.error(err);
  const status = err.status || 500;

  const message = err.expose ? err.message : err.message || "Internal Server Error";
  if (!res.headersSent) {
    res.status(status).json({ error: message });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`}`);
  console.log(`CORS origins allowed: ${allowedOrigins.join(", ")}`);
});
