const path = require("path");
const router = require("express").Router();
const loginRoutes = require("./login");
const resourceRoutes = require("./resource");
const userRoutes = require("./user");
const taskRoutes = require("./task");

// LOGIN ROUTES

//  matches "/loginPage"
router.use("/loginPage", loginRoutes);

// USER 
// matches "/API"
router.use("/API", userRoutes);

// RESOURCE ROUTES

//  matches "/"
router.use("/", resourceRoutes);

router.use("/task", taskRoutes);


// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
