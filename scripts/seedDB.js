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

const resourceSeed = [ck
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

// add the resource seeds to the db
db.Resource
    .remove({})
    .then(() => db.Resource.collection.insertMany(resourceSeed))
    .then(dbResources => {
        console.log(dbResources.result.n + " records inserted!")
        // add the user seed(s) to the db
        db.User
        .remove({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(dbUser => {
            console.log(dbUser.result.n + " records inserted!");
            db.Resource
                .find({}, "_id")
                .then(dbResourceIds => {
                    // console.log("dbUser: ", dbUser.username)
                    db.User
                        .findOne({}).limit(1).sort({createdAt: "desc"})
                        .then(User => {
                            console.log("User: ", User);
                            for (e of dbResourceIds) {
                                User.resources.push(e._id);
                                console.log("_id: ", e._id);
                            }
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



// get all the resource seeds and push their _ids to the 'resources' array of the user where username is "user"

