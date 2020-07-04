const path = require("path");
const router = require("express").Router();
const loginRoutes = require("./login");
const resourceRoutes = require("./resource");
const userRoutes = require("./user");

// LOGIN ROUTES

//  matches "/loginPage"
router.use("/loginPage", loginRoutes);

// USER & TASK ROUTES
// matches "/API"
router.use("/API", userRoutes);

// RESOURCE ROUTES

//  matches "/"
router.use("/", resourceRoutes);


// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
