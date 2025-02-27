import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    teamName: {type: String, required: true},
    league: {type: String, required: true},
    startYear: {type: Number, min: 1900, max: new Date().getFullYear(), required: false},
    endYear: {type: Number, min: 1900, required: false},

})

const eventSchema = new mongoose.Schema({
    eventName: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    location: {type: String, required: true},
    teamName: {type: String, required: false}
})

const awardSchema = new mongoose.Schema({
    awardName: {type: String, required: true},
    awardYear: {type: Number, required: true}
})

const playerSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        enum: ["Women's", "Men's"],
        required: true,
    },
    // TO DO: uncomment when adding more sports
    // sport: {
    //     type: String,
    //     enum: [],
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    },
    graduatingYear: {
        type: Number,
        required: true,
    },
    school: {
        type: String,
        required: true
    },
    height: {
        feet: { type: Number, required: true, min: 0 },
        inches: { type: Number, required: true, min: 0, max: 11 },
    },
    weight: {
        type: Number,
        min: 0,
        required: true
    },
    position: {
        type: String,
        // not:e if adding more sports, remove position enum
        enum: ["Goalkeeper", "Center Back", "Full Back", "Midfielder", "Winger", "Forward"],
        required: true
    },
    currentTeam: {
        type: teamSchema,
        required: true
    },
    otherTeams: {
        type: [teamSchema],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    individualAwards: {
        type: [awardSchema],
        required: true
    },
    teamAwards: {
        type: [awardSchema],
        required: true
    },
    profilePic: {
        type: Buffer,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    upcomingEvents: {
        type: [eventSchema],
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: Date,
    dateDeleted: Date

})

const Player = mongoose.model('Player', playerSchema, 'Players');

export default Player;