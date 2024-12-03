const mongoose = require("mongoose")

const connectToDb = async (url) => {
    return await mongoose.connect(url)
}

module.exports = connectToDb