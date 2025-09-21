import { Router } from "express";
import passport from "passport";
import * as db from "../database/users.js";

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL;

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: `${FRONTEND_URL || "/"}` }), async (req, res, next) => {
  try {
    const userInfo = await db.getUserByEmail(req.user.email);

    if (!userInfo) {
      // create if needed
    }
    req.session.save((err) => {
      if (err) return next(err);

      return res.redirect(`${FRONTEND_URL}/home`);
    });
  } catch (e) {
    return next(e);
  }
});

router.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

router.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("sid", { path: "/" });
      res.sendStatus(204);
    });
  });
});

export function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: "unauthorized" });
}

router.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({ message: `Welcome, ${req.user.full_name}!`, role: req.user.role });
});

router.get("/debug/set-cookie", (req, res) => {
  const secure = process.env.NODE_ENV === "production";
  res.cookie("sid_test", "ok", {
    httpOnly: true,
    sameSite: secure ? "none" : "lax",
    secure,
    path: "/",
    maxAge: 5 * 60 * 1000,
  });
  res.json({ message: "sent Set-Cookie for sid_test" });
});

router.get("/debug/echo-cookie", (req, res) => {
  const cookieHeader = req.headers.cookie || "";
  res.json({
    receivedCookieHeader: cookieHeader || null,
    hasSidTest: cookieHeader.includes("sid_test="),
  });
});

export default router;
