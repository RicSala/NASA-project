import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://nasa-api:jwQjGkmlDOwcCFNA@nasacluster.x1f1prb.mongodb.net/nasa?retryWrites=true&w=majority'


mongoose.connection.once('open', ( ) => console.log("MongoDB Connection ready"))

mongoose.connection.on('error', (err) => console.error(err))

async function mongoConnect() {
    try {
        await mongoose.connect(MONGO_URL) 
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log("Error Connecting to MongoDB:", err)
    }
}

async function mongoDisconnect() {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
}

export { mongoConnect, mongoDisconnect }

// BUG#2 I am getting an error when running the test.It seems like something is trying to access the database after it's disconnected. May be related to bug#1