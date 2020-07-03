const router = require("express").Router();
const resourceController = require("../../controllers/resourceController");

// Get all resources in the DB
//    matches "/rsc/getAll/Resources"
router.route("/getAll/Resources").get(resourceController.findAll);

// Get a resource by id
//    matches "/rsc/getOne/:rscId"
router.route("/getOne/:rscId").get(resourceController.findById);

// Update a resource by id
//    matches "/rsc/updateOne/:rscId"
router.route("/updateOne/:id").put(resourceController.updateById);

// Delete a resource by id
//    matches "/rsc/deleteOne/:rscId"
router.route("/deleteOne/:rscId").delete(resourceController.deleteById);

// get ALL by CATEGORY
router.route("/getByCat/:category").get(resourceController.findByCategory);

// Get ALL resources/documents that belong to a user
//    matches "/rsc/:UserId"
router
  .route("/:UserId")
  .get(resourceController.findUsersResources)
  .post(resourceController.create);

// add new resource
router.route("/addNew").post(resourceController.create);

// add favorite
router.route("/addFavorite/:id").get(resourceController.addFavorite);

// delete favorite from array in USER DB, using $pull in controller
router.route("/deleteFavorite/:id").get(resourceController.deleteFavorite);

// get favorite
router.route("/getfavorites/:id").get(resourceController.getFavorite);

module.exports = router;
