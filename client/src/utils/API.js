import axios from "axios";

export default {
  // registere New User
  registerUser: function (newUser) {
    return axios.post("/loginPage/login/createUser", newUser);
  },

  //   login existing user
  userLogin: function (User) {
    return axios.post("/loginPage/login/login/", User);
  }
};
