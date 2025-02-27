import mongoose from 'mongoose'

const coachSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    },
    university: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: Date,
    dateDeleted: Date,
    activated: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const Coach = mongoose.model('Coach', coachSchema, 'Coaches');

export default Coach;