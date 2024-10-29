const mongoose = require('mongoose')

const userdata = mongoose.Schema({
    username: {
        type: String,

    },
    password:
    {
        type: String,
    }
})

const user = mongoose.model("vchatuser", userdata)


module.exports = user;