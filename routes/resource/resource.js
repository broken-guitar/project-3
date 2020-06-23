const router = require("express").Router();
const resourceController = require("../../controllers/resourceController");

// matches with "/rsc/"
router.route("/:rscId")
  .get(resourceController.findById);
  

// Get ALL resources/documents that belong to user
//  - matches with "/rsc/:UserId"
router.route("/:UserId") 
  .get(resourceController.findUsersResources)
  .post(resourceController.create);

module.exports = router;
