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
  }
};
