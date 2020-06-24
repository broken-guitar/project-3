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
    console.log("getUsername requested hit API call, userId: ", UserId);
    return axios.get("/API/getUser/" + UserId);
  },

  // ---------------
  // resources

  getResources: function(UserId) {
      return axios.post("/rsc/", UserId);
  }



};
