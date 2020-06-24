const router = require("express").Router();
const resourceController = require("../../controllers/resourceController");

// Get a resource by id
// -> matches "/rsc/:rscId"
router.route("/:rscId")
  .get(resourceController.findById);
  

// Get ALL resources/documents that belong to a user
//  -> matches "/rsc/:UserId"
router.route("/:UserId") 
  .get(resourceController.findUsersResources)
  .post(resourceController.create);

module.exports = router;
