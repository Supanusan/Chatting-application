const { default: mongoose } = require("mongoose")


const Mongoose = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/local")
        console.log("MDB connected...")
    } catch (error) {
        console.log(error.message)
        process.exit(1)

    }
}
module.exports = Mongoose;