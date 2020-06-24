const path = require("path");
const router = require("express").Router();
const loginRoutes = require("./login");
const resourceRoutes = require("./resource")

// LOGIN ROUTES

//  matches "/loginPage"
router.use("/loginPage", loginRoutes);

// RESOURCE ROUTES

//  matches "/"
router.use("/", resourceRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
