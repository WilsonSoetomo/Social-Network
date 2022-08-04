const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trimmed: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts:[
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Thought'
      }
    ],
    friends:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
},{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

UserSchema.virtual("friendcount").get(function() {
  return this.friends.length;
});
const User = mongoose.model("User", UserSchema);

const handleError = (err) => console.error(err);

module.exports = User;
