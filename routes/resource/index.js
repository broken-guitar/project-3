const router = require("express").Router();
const resourceRoutes = require("./resource.route");

// matches "/rsc"
router.use("/rsc", resourceRoutes);

module.exports = router;
