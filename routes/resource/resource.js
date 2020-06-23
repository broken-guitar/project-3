const router = require("express").Router();
const resourceController = require("../../controllers/resourceController");

// matches with "/rsc/"
router.route("/:rscId")
  .get(resourceController.findById)
  .post(resourceController.create);

// Get all resources/documents that have an associated UserId
//  - matches with "/rsc/:UserId"
router.route("/:UserId") 

  .get(resourceController.findByUserId);

module.exports = router;
