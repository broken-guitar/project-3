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

  // add new resource
  addNewResource: function (newResource) {
    return axios.post("/rsc/addNew", newResource);
  },

  // get one resource
  getResourceById: function (rscId) {
    return axios.get("/rsc/getOne/" + rscId);
  },

  getAllCategories: function() {
      return axios.get("/rsc/getAll/Cats");
  }

};
