const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const resourceSchema = new Schema({

  title: { type: String, required: true },

  type: { type: String, required: false },

  category: { type: String, required: false },

  link: { type: String, required: false },

  description: { type: String, required: false },

  creator: { type: String, required: false },

  owner: { type: String, required: false },


  // 'users' is an array that stores User ObjectIds (_id), then
  // we have to manually save/remove User _ids here with separate queries
  // (IF we want to store user association in the Resrouce document)
  users: [
    {
      type: Schema.Types.ObjectId, // _ids of Users go here
      ref: "User" // need this to tell mongoose to use _ids from the User model
    }
  ]
},
  {
    // timestamps is a Mongoose schema option that will
    // automatically add/update "createdAt" and "updatedAt" fields
    timestamps: true
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
