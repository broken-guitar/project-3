const db = require("../models");

module.exports = {

// CREATE
  
  create: function (req, res) {
    db.Task.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },


// READ

  // Find all resources in DB
  findAll: function (req, res) {
    db.Task.find({})
      .then((dbResources) => res.json(dbResources))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.Task.findById(req.params.taskId)
      .sort({})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  findUsersTasks: function (req, res) {
    db.Task.find(
        { assUsers: {$in: [req.params.id]}}
        ) // find the user by _id
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },

// UPDATE

updateById: function (req, res) {
    db.Task.findById(req.params.id)
}

// DELETE


};
