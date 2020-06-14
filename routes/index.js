const path = require("path");
const router = require("express").Router();
const loginRoutes = require("./login");

// API Routes
router.use("/loginPage", loginRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
