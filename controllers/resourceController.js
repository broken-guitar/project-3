const db = require("../models");

module.exports = {
    
        
    // find a specific RESOURCE by id
    findById: function(req, res) {
        db.Resource
            .findById(req.params.rscId)
            .sort({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    // get all resource (as db objects) that belong to a USER
    findUsersResources: function(req, res) {
        db.User
            .findOne({_id: req.params.UserId}) // find the user by _id
            .populate("resources")  // returns all Resources (as full objects) with the returned User
                                    // for example: User.resources[0].title, etc...
            .then(dbUserDotResources => res.json(dbUserDotResources)) 
            .catch(err => res.status(422).json(err));
    },

    // create a new RESOURCE
    create: function(req, res) {
        db.Resource
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    

}