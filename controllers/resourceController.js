const db = require("../models");

module.exports = {
    // find a specific resource by id
    findById: function(req, res) {
        db.Resource
            .findById(req.params.rscId)
            .sort({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    // find all resources that belong to a user
    findUsersResources: function(req, res) {
        db.Resource
            .find({UserId: req.params.UserId})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // create a new resource
    create: function(req, res) {
        db.Resource
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    
}