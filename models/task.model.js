const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const taskSchema = new Schema({

  title:    { type: String, required: true },
  type:     { type: String, required: true, enum: ["Task", "Reminder", "Note"], default: "Task"},
  priority: { type: String, required: false },
  status:   { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: false },
  link: { type: String, required: false },
  
  users: [{ type: Schema.Types.ObjectId, ref: "User"}], // assigned users
  resources: [{ type: Schema.Types.ObjectId, ref: "Resources" }],

  creator: { type: String, required: false },
  owner: { type: String, required: false },
},
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
