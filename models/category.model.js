// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const categorySchema = new Schema({

//     title:          { type: String, required: true },
//     description:    { type: String, required: false },
//     creator:        { type: String, required: false },
//     owner:          { type: String, required: false},
    
//     // if we want to associate users to this category
//     users: [{
//             type: Schema.Types.ObjectId, // _ids of Users go here
//             ref: "User" // need this to tell mongoose to use _ids from the User model
//     }],
//     // if we want to associate resources to this category
//     resources: [{ type: Schema.Types.ObjectId, ref: "Resources" }],
// }, {
//     // automatically handle "createdAt" and "updatedAt" fields
//     timestamps: true
// });

// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;
