const db = require("../models");

module.exports = {

// CREATE
  
  addTask: function (req, res) {
    db.Task
    .create(req.body.task)
    .then(dbAddedTask => {
        console.log("dbAddedTask: ", dbAddedTask); 
        dbAddedTask.users.addToSet(req.body.userId);
            dbAddedTask.save(err => {
               if (err) console.log(err);
               console.log('Save successful');
            });
        res.json(dbAddedTask);
    })
    .catch((err) => res.status(422).json(err));
  },


// READ

  findUsersTasks: function (req, res) {
    // console.log("controller.findUsersTasks: ", req.params.userId);
    db.Task.find(
        { users: {$in: [req.params.userId]}} // get tasks that have user id in tasks's users array
        ) // find the user by _id
        .then((dbUserTasks) => {
            // console.log("\n.findUsersTasks->return: ", dbModel);
            let data = {
                tasks: dbUserTasks,
                taskTypes: db.Task.schema.path("type").enumValues
            }
            res.json(data)
        })
        .catch((err) => res.status(422).json(err));
  },

// UPDATE

    updateTask: function(req, res) {
        console.log("controller.updateTask.req: ", req.params, "body: ", req.body)
        db.Task.findByIdAndUpdate(req.params.taskId, {
            title:          req.body.title,
            description:    req.body.description,
            type:           req.body.type
        },
        { useFindAndModify: false, new: true })
        .then(dbTask => {
            console.log("Task " + dbTask._id + " updated successfully!");
            res.json(dbTask);
        })
        .catch((err) => res.status(422).json(err));
    },

// DELETE

    deleteTask: function(req, res) {
        console.log("controller.deleteTask-> taskId ", req.params.taskId)
        db.Task.findByIdAndDelete(req.params.taskId)
        .then(dbTask => {
            console.log("res: ", dbTask);
            res.json(dbTask);  
        })
        .catch(err => res.status(422).json(err));
    }
};
