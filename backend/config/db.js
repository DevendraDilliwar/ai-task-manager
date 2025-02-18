const mongoose = require('mongoose')
require('colors')

const connectDb = async () => {
    try {
        console.log("Attempting to connect to database...".yellow);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database connected successfully.'.green);
    } catch (error) {
        console.log("Failed to connect to database.".error.message);
        console.log(error);
    }
}

module.exports = connectDb;