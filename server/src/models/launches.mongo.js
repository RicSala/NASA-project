import mongoose from 'mongoose'

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true
    },
    sucess: {
        type: Boolean,
        required: true,
        default: true,
    }
})

//Connect launchesSchema with the launches collection --> mongoose transform the string to lowercase and plural
export default mongoose.model('Launch', launchesSchema) // Mongoose call this "compiling the model"

