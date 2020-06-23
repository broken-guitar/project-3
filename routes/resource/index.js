const router = require("express").Router();
const resourceRoutes = require("./resource");

// matches "/rsc"
router.use("/rsc", resourceRoutes);

module.exports = router;
