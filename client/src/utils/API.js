import axios from "axios";

export default {
  // *** USER LOGIN API ***

  // register New User
  regUser: function (newUser) {
    return axios.post("/loginPage/login/createUser", newUser);
  },

  // login existing user
  userLogin: function (User) {
    return axios.post("/loginPage/login/login/", User);
  },

  // check user authenticated by checking cookies
  checkUser: function (UserId) {
    return axios.post("/loginPage/login/checkUser", UserId);
  },

  // get username (after logged in)
  getUsername: function (UserId) {
    return axios.get("/API/getUser/" + UserId);
  },

  // *** RESOURCE API ***

  // get all resources
  getAllResources: function () {
    return axios.get("/rsc/getAll/Resources");
  },

  // update rsc by id
  editResource: function (id, newResource) {
    return axios.put("/rsc/updateOne/" + id, newResource);
  },

  // add new resource
  addNewResource: function (newResource) {
    return axios.post("/rsc/addNew", newResource);
  },

  // get one resource
  getResourceById: function (rscId) {
    return axios.get("/rsc/getOne/" + rscId);
  },

  // delete one resource
  deleteResourceById: function (rscId) {
    return axios.delete("/rsc/deleteOne/" + rscId);
  },

  // get all resources by category
  getAllByCategory: function (category) {
    return axios.get("/rsc/getByCat/" + category);
  },

  // add resource to favorites array in User db
  addFavorite: function (resourceId) {
    return axios.get("/rsc/addFavorite/" + resourceId);
  },

  // delete resource from favorites array User DB
  deleteFavorite: function (resourceId) {
    return axios.get("/rsc/deleteFavorite/" + resourceId);
  },

  // get all categories
  getAllCategories: function () {
    return axios.get("/rsc/getAll/Cats");
  },

  // get favorite resources from User DB on favorites page load
  getFavorites: function (UserId) {
    return axios.get("/rsc/getfavorites/" + UserId);
  }
};
