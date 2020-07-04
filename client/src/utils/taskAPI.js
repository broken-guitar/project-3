import axios from "axios";

export const API = {

    // get user's tasks
    getUserTasks: function(userId) {
        return axios.get("/API/task/" + userId);
    },

    addTask: function(data) {
        return axios.post("/API/task/", data);
    }

    
}