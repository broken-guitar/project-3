const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({

    category: { type: String, required: true },

    title: { type: String, required: true },

    // add logic: make EITHER link OR description required
    // (else, someone may add empty titles with no resource)

    link: { type: String, required: false },

    description: { type: String, required: false },

    // add user cookie to eventually display who created & when in details

    // creator: { type: String, required: true },


    // createdAt: { type: currentTime(?), required: true}
    // need to look up time stamp logic.....
})

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
