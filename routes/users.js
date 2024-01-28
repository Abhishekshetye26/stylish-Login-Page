const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost:27017/test");

const userSchema = mongoose.Schema({

    username: String,
    password: String,
    secret : String
})


userSchema.plugin(plm);

module.exports = mongoose.model("user" , userSchema);