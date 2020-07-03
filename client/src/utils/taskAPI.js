import axios from "axios";

export default {

    // get user's tasks
    getUsersTasks: function(userId) {
        return axios.get("/task/s/", userId);
    },

    addTask: function(data) {
        return axios.post("/task/s/", data);
    }

    
}