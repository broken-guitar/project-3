import axios from "axios";

export const API = {

    // get user's tasks
    getUserTasks: function(userId) {
        return axios.get("/API/task/" + userId);
    },

    addTask: function(data) {
        return axios.post("/API/task/", data);
    },

    // update rsc by id
    updateTask: function (taskId, taskData) {
        return axios.put("/API/task/" + taskId, taskData);
    },

    deleteTask: function (taskId) {
        return axios.delete("/API/task/" + taskId);
    }

}