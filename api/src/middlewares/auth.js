export function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();

  return res.status(401).json({ error: "unauthorized" });
}

export function requireRole(...roles) {
  return (req, res, next) => {
    const user = req.user || req.session?.user;
    if (user && roles.includes(user.role)) return next();
    return res.status(403).json({ error: "forbidden" });
  };
}
