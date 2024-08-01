function isAuthenticated(req, res, next) {
  if (req.session && req.session.username) {
    return next();
  } else {
    res.status(401).json({ error: "Access denied Unauthorized Access" });
  }
}

function adminAuth(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  } else {
    return res.status(403).json({
      error: "Access denied. Admin authentication required.",
    });
  }
}

module.exports = { isAuthenticated, adminAuth };
