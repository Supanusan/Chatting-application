const mongoose = require('mongoose')

const message_module = mongoose.Schema({
    message: String
})
const MBmessage = mongoose.model("messsage", message_module)

module.exports = MBmessage;