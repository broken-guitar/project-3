const router = require("express").Router();
const resourceController = require("../../controllers/resourceController");

// Get all resources in the DB
// matches "/rsc/getAll/Resources"
router.route("/getAll/Resources").get(resourceController.findAll);

// Get a resource by id
// -> matches "/rsc/getOne/:rscId"
router.route("/getOne/:rscId").get(resourceController.findById);

// Get ALL resources/documents that belong to a user
//  -> matches "/rsc/:UserId"
router
  .route("/:UserId")
  .get(resourceController.findUsersResources)
  .post(resourceController.create);

// add new resource
router.route("/addNew").post(resourceController.create);

module.exports = router;
