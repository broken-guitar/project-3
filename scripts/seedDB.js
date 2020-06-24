const mongoose = require("mongoose");
const db = require("../models");

// WARNING! Deletes everything from the Users and Resources collections then adds these seeds.

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/resourceCenter"
);

const userSeed = [
    {
        username:   "user",
        email:      "user@email.com",
        password:   "12345",
        resources:  []
    }
];

const resourceSeed = [
    {
        title:      "resource1",
        category:   "cat",
        link:       "https://placekitten.com/200/300"
    },
    {
        title:      "resource2",
        category:   "cat",
        link:       "https://placekitten.com/g/200/300"
    },
    {
        title:      "resource3",
        category:   "cat",
        link:       "https://placekitten.com/300/200"
    },
    {
        title:      "resource4",
        category:   "cat",
        link:       "https://placekitten.com/150/300"
    },
    {
        title:      "resource5",
        category:   "cat",
        link:       "https://placekitten.com/300/150"
    }
]

// add the Resource seeds to the db
db.Resource
    .remove({})
    .then(() => db.Resource.collection.insertMany(resourceSeed))
    .then(dbResources => {
        console.log(dbResources.result.n + " records inserted!")
        // add the User seed(s) to the db
        db.User
        .remove({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(dbUser => {
            console.log(dbUser.result.n + " records inserted!");
            // get all the Resource _id so we can associate them with our demo User...
            db.Resource
                .find({}, "_id")
                .then(dbResourceIds => {
                    // ...now get the new User...
                    db.User
                        .findOne({}).limit(1).sort({createdAt: "desc"})
                        .then(User => {
                            // ...and push each Resource _id to the User's "resources" array (save refs for model association)
                            for (e of dbResourceIds) {
                                User.resources.push(e._id);
                                console.log("Resource id " + e._id + " pushed to demo " + User.username + "'s 'resources' array");
                            }
                            // save the User to update the db
                            User.save(err => {
                                if (err) return console.log(err);
                                process.exit(0);
                            });
                        });
                    
                })
                .catch(err => {
                    console.error(err);
                    process.exit(1);
                });
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

