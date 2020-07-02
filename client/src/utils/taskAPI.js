import axios from "axios";

export default {

    // get user's tasks
    getUsersTasks: function(userId) {
        return axios.get("/task/", userId)
    },

    
}