const mongoose = require("mongoose");
const db = require("../models");

// WARNING! Deletes everything from the Users and Resources collections then adds these seeds.
// Unsure why script doesn't end....

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/resourceCenter"
);

const userSeed = [
    {
        username: "user",
        email: "user@email.com",
        password: "$2b$10$Bf75jH6DJPAqu.1QBSQoIeLleYTd06zwxe5YHcWPVz33zI1FJhr32", // hashed password
        role: "Admin"
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


    // Human Resources

    {
        title: "Trinet",
        // type: "Link",
        category: "Human Resources",
        link: "https://www.trinet.com/",
        description: "Log in for paycheck, insurance info....",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Company LinkedIn",
        // type: "Link",
        category: "Human Resources",
        link: "https://www.linkedin.com/company/pg-paper-company-ltd/",
        description: "Connect with your coworkers on LinkedIn!",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Company Website",
        // type: "Link",
        category: "Human Resources",
        link: "https://www.pgpaper.com/",
        description: "Log in for paycheck, insurance info....",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Complaint or Concern?",
        // type: "Note",
        category: "Human Resources",
        link: "http://www.complaint.com/",
        description: "Please email mscott@pgpaper.com with any questions or concerns",
        // creator: "Michael Scott",
        // owner: "Micheal Scott"
    },


    // Common Programs

    {
        title: "Microsoft 365",
        // type: "Link",
        category: "Common Programs",
        link: "https://www.microsoft.com/en-us/microsoft-365",
        description: "Make sure your account is set up here.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Oracle Netsuite",
        // type: "Link",
        category: "Common Programs",
        link: "https://nlcorp.extforms.netsuite.com/",
        description: "Warehouse tracking program. Make sure your account is set up here.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    // Shipping & Receiving

    {
        title: "Fedex",
        // type: "Link",
        category: "Shipping and Receiving",
        link: "https://www.fedex.com/apps/myprofile/deliverymanager/",
        description: "Our account number is 11111111. Create a login and link to company profile.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Point Purchasing",
        // type: "Link",
        category: "Shipping and Receiving",
        link: "https://www.pointpurchasing.com/",
        description: "Can order through this site. Make sure to log all items received in this site.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },


    // Research

    {
        title: "Britannica Papermaking",
        // type: "Link",
        category: "Research",
        link: "https://www.britannica.com/technology/papermaking/Fibre-sources",
        description: "How paper is made.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "EPA Industry Profile",
        // type: "Link",
        category: "Research",
        link: "https://www.epa.gov/ghgreporting/ghgrp-pulp-and-paper-sector-industrial-profile",
        description: "Paper industry profile.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "EPA Paper Pollutants",
        // type: "Link",
        category: "Research",
        link: "https://cfpub.epa.gov/si/si_public_record_report.cfm?Lab=ORD&TIMSType=&count=10000&dirEntryId=35610&searchAll=&showCriteria=2&simpleSearch=0&startIndex=70001",
        description: "EPA reports paper pollution. Issue we want resolved.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Top Paper Consumption/Producer",
        // type: "Link",
        category: "Research",
        link: "https://globaledge.msu.edu/blog/post/55571/the-worldwide-paper-industry#:~:text=Overall%2C%20China%20leads%20all%20countries,with%20221%20kilograms%20per%20capita.",
        description: "Global Edge article reporting China as top consumer and producer of paper.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    // Lunch Options

    {
        title: "Ikes",
        // type: "Link",
        category: "Food",
        link: "https://www.grubhub.com/food/ikes_love__sandwiches",
        description: "They deliver super fast!",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },

    {
        title: "Food Trucks out Front",
        // type: "Link",
        category: "Food",
        link: "https://www.mvblfeast.com/weekly-markets",
        description: "Tuesdays and Thursdays 11am-1:30pm. Exit front, turn right and walk one block.",
        // creator: "Pam Beesly",
        // owner: "Pam Beesly"
    },


    // Categories - using different format now

    // {   title:      "Admin" ,               type: "Category"},
    // {   title:      "Accounting" ,          type: "Category"},
    // {   title:      "Human Resources" ,     type: "Category"},
    // {   title:      "Maintenance" ,         type: "Category"},
    // {   title:      "Sales" ,               type: "Category"},
    // {   title:      "Shipping/Receiving" ,  type: "Category"},
    // {   title:      "General" ,             type: "Category"},

    // Resources - using prior format

    // {
    //     title:          "resource1",
    //     type:           "Link",
    //     link:           "https://placekitten.com/200/300",
    //     Description:    "General"
    // },
    // {
    //     title:      "resource2",
    //     type:       "Document",
    //     link:       "https://placekitten.com/g/200/300"
    // },
    // {
    //     title:      "resource3",
    //     type:       "Contact",
    //     link:       "https://placekitten.com/300/200"
    // },
    // {
    //     title:      "resource4",
    //     type:       "Note",
    //     link:       "https://placekitten.com/150/300"
    // },
    // {
    //     title:      "resource5",
    //     type:       "Image",
    //     link:       "https://placekitten.com/300/150"
    // }
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
    .then(() => db.Resource.collection.insertMany(resourceSeed) // add Resource seeds
        .then(dbRsc => {
            console.log(dbRsc.result.n + " resource records inserted!");
            process.exit(0);
        })
    )
    // .then(() => db.User.remove({}).exec() // remove all users
    //     .then(() => db.User.collection.insertMany(userSeed) // add user seeds
    //         .then(dbUsr => {
    //             console.log(dbUsr.result.n + " User record(s) inserted!");
    //             process.exit(0);
    //         })

    //     ))


    // .then( () => db.Category.remove({}).exec() // remove all Category docs
    //   .then( () => db.Category.collection.insertMany(categorySeed) // add Category seeds
    //     .then( dbCat => console.log(dbCat.result.n + " Category records inserted!"))
    // ))

    // Data is seeded, now set up default associations...
    // remove associations for now....

    // .then(() => db.User.findOne({}).limit(1).sort({ createdAt: "desc" }).exec() // get our default user
    //     .then(dbUser => {
    //         console.log("\nFound user: ", dbUser.username);
    //         var results = [];
    //         return db.Resource.findOne({ type: "Category", title: "Admin" }).limit(1) // get the Admin category
    //             .then(dbCatAdmin => {
    //                 console.log("\nFound category: ", dbCatAdmin.title);
    //                 dbCatAdmin.users.push(dbUser._id);
    //                 results = [dbUser, dbCatAdmin] // saving the user, category instances for the next promise
    //                 return results
    //             });
    //     })
    // )
    // .then(results => {
    //     // console.log("\nPromise after saving user to Admin cateogry");
    //     db.Resource.find({ type: { $ne: "Category" } }, "_id")
    //         .then(dbRscIds => {
    //             // console.log("Found resource ids: ", dbRscIds)
    //             for (r of dbRscIds) {
    //                 results[0].resources.push(r._id); // results[0] = our seed user from parent query
    //                 console.log("\nResource id " + r._id + " pushed to " + results[0].username + "'s resources array");
    //             }
    //             results[0].save(err => {
    //                 if (err) console.log(err)
    //                 results[1].save(err => {
    //                     if (err) console.log(err)
    //                     console.log("\nFinal saved results:\n user:\n", results[0], "\nAdmin:\n", results[1]);
    //                     process.exit(0);
    //                 });
    //             });

    //         });
    // })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
