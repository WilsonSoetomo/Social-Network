const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  thoughtText: { 
    type: String, 
    required: true, 
    minlength: 1,
    maxlength: 280,
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
  },
    username:[
      {
        type: String, 
        required: true,
      }
    ],
    reactions:[]
},{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

ThoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length;
});
const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;
