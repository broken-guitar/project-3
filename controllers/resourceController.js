const db = require("../models");

module.exports = {

    findById: function(req, res) {
        db.Resource
            .findById(req.params.rscId)
            .sort({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    findByUserId: function(req, res) {
        db.Resource
            .findById(req.params.UserId)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    create: function(req, res) {
        db.Resource
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
    

}