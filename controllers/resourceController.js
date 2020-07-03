const db = require("../models");

module.exports = {
  // find a specific RESOURCE by id
  findById: function (req, res) {
    db.Resource.findById(req.params.rscId)
      .sort({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // update a specific resource by id

  updateById: function (req, res) {
    db.Resource.findByIdAndUpdate(
      req.params.id,

      {
        title: req.body.title,
        category: req.body.category,
        link: req.body.link,
        description: req.body.description
      },
      { useFindAndModify: false }
      // new: true
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // delete a specific resource by id

  deleteById: function (req, res) {
    db.Resource.findByIdAndDelete(req.params.rscId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // get all resource (as db objects) that belong to a USER
  findUsersResources: function (req, res) {
    db.User.findOne({ _id: req.params.UserId }) // find the user by _id
      .populate("resources") // returns all Resources (as full objects) with the returned User
      // for example: User.resources[0].title, etc...
      .then(dbUserDotResources => res.json(dbUserDotResources))
      .catch(err => res.status(422).json(err));
  },

  // create a new RESOURCE
  create: function (req, res) {
    db.Resource.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Find all resources in DB
  findAll: function (req, res) {
    db.Resource.find({})
      .then(dbResources => res.json(dbResources))
      .catch(err => res.status(422).json(err));
  },

  // add to favorites
  addFavorite: function (req, res) {
    db.User.findByIdAndUpdate(req.cookies.id, {
      $addToSet: { favorites: req.params.id },
      useFindAndModify: false,
      new: true
    })
      .then(dbUser => res.json(dbUser.favorites.data))
      .catch(err => console.log(err));
  },

  // delete favorite from user
  deleteFavorite: function (req, res) {
    db.User.findByIdAndUpdate(req.cookies.id, {
      $pull: { favorites: req.params.id },
      useFindAndModify: false
    })
      .then(dbUser => {
        res.json(dbUser.favorites);
      })
      .catch(err => console.log(err));
  },

  // get favorites
  getFavorite: function (req, res) {
    console.log(req.cookies.id);
    db.User.findById(req.cookies.id)
      .populate("favorites")
      .then(dbUser => {
        res.json(dbUser.favorites);
      })
      .catch(err => console.log(err));
  },

  // find resources by category
  findByCategory: function (req, res) {
    db.Resource.find({ category: req.params.category }).then(dbResources =>
      res.json(dbResources)
    );
  }
};
