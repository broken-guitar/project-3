import axios from "axios";

export default {
  // registere New User
  regUser: function (newUser) {
    return axios.post("/loginPage/login/createUser", newUser);
  },

  //   login existing user
  userLogin: function (User) {
    return axios.post("/loginPage/login/login/", User);
  },

  // check user authenticated by checking cookies
  checkUser: function (UserId) {
    return axios.post("/loginPage/login/checkUser", UserId);
  },

  // after logged in, just to get username
  getUsername: function (UserId) {
    return axios.get("/API/getUser/" + UserId);
  },

  // ---------------
  // resources

  getResources: function (UserId) {
    return axios.post("/rsc/", UserId);
  },

  getAllResources: function () {
    return axios.get("/rsc/getAll/Resources");
  },

  addNewResource: function (newResource) {
    return axios.post("/rsc/addNew", newResource);
  },

  getResourceById: function (rscId) {
    return axios.get("/rsc/getOne/" + rscId);
  }
};
