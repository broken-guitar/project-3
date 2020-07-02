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
        password:   "$2b$10$Bf75jH6DJPAqu.1QBSQoIeLleYTd06zwxe5YHcWPVz33zI1FJhr32", // hashed password
        role:       "Admin"
    }
];

// const categorySeed = [
//     {   title:      "Admin" , type: "Category"},
//     {   title:      "Accounting" , type: "Category"},
//     {   title:      "Human Resources" , type: "Category"},
//     {   title:      "Maintenance" , type: "Category"},
//     {   title:      "Sales" , type: "Category"},
//     {   title:      "Shipping/Receiving" , type: "Category"},
//     {   title:      "General" , type: "Category"}
// ]

const resourceSeed = [
    
    // Categories

    {   title:      "Admin" ,               type: "Category"},
    {   title:      "Accounting" ,          type: "Category"},
    {   title:      "Human Resources" ,     type: "Category"},
    {   title:      "Maintenance" ,         type: "Category"},
    {   title:      "Sales" ,               type: "Category"},
    {   title:      "Shipping/Receiving" ,  type: "Category"},
    {   title:      "General" ,             type: "Category"},

    // Resources

    {
        title:          "resource1",
        type:           "Link",
        link:           "https://placekitten.com/200/300",
        Description:    "General"
    },
    {
        title:      "resource2",
        type:       "Document",
        link:       "https://placekitten.com/g/200/300"
    },
    {
        title:      "resource3",
        type:       "Contact",
        link:       "https://placekitten.com/300/200"
    },
    {
        title:      "resource4",
        type:       "Note",
        link:       "https://placekitten.com/150/300"
    },
    {
        title:      "resource5",
        type:       "Image",
        link:       "https://placekitten.com/300/150"
    }
]

const taskSeed = [
    {
        title: "task1"
    },
    {
        title: "task2"
    },
    {
        title: "task3"
    }
]

// ADD THE SEEDS

db.Resource.remove({}).exec() // remove all Resource docs
    .then( () =>  db.Resource.collection.insertMany(resourceSeed) // add Resource seeds
      .then( dbRsc => console.log(dbRsc.result.n + "Resource records inserted!")) 
    )
    .then( () => db.User.remove({}).exec() // remove all users
      .then( () => db.User.collection.insertMany(userSeed) // add user seeds
        .then( dbUsr => console.log(dbUsr.result.n + " User record(s) inserted!"))
    ))
    .then(() => db.Task.remove({}).exec() 
      .then(() => db.Task.collection.insertMany(taskSeed)
        .then(dbTask => console.log(dbTask.result.n + " Task record(s) inserted!")
    )))

    // .then( () => db.Category.remove({}).exec() // remove all Category docs
    //   .then( () => db.Category.collection.insertMany(categorySeed) // add Category seeds
    //     .then( dbCat => console.log(dbCat.result.n + " Category records inserted!"))
    // ))
    
// Data is seeded, now set up default associations...

    .then( () => db.User.findOne({}).limit(1).sort({ createdAt: "desc" }).exec() // get our default user
        .then(dbUser => {
            console.log("\nFound user: ", dbUser.username);
            var results = [];
            return db.Resource.findOne({type: "Category", title: "Admin"}).limit(1) // get the Admin category
                .then(dbCatAdmin => {
                    console.log("\nFound category: ", dbCatAdmin.title);
                    dbCatAdmin.users.push(dbUser._id);
                    results = [dbUser, dbCatAdmin] // saving the user, category instances for the next promise
                    return results
                });
         })
    )
    .then(results => {
        // console.log("\nPromise after saving user to Admin cateogry");
        db.Resource.find({ type: {$ne: "Category"} }, "_id")
            .then(dbRscIds => {
                // console.log("Found resource ids: ", dbRscIds)
                for (r of dbRscIds) {
                    results[0].resources.push(r._id); // results[0] = our seed user from parent query
                    console.log("\nResource id " + r._id + " pushed to " + results[0].username + "'s resources array");
                }
                results[0].save(err => {
                    if (err) console.log(err)
                    results[1].save(err => {
                        if (err) console.log(err)
                        console.log("\nFinal saved results:\n user:\n", results[0], "\nAdmin:\n", results[1]);
                        process.exit(0);
                    });
                });
                    
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});
