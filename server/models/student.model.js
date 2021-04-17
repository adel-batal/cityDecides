import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 12
    },
    firstName: {
        type: String,
        // required: true,
        trim: true,
    },
    lastName: {
        type: String,
        // required: true,
        trim: true,
    },
    regNumber: {
        type: String,
        // required: true,
        trim: true,
    },
    password : {
        type: String,
        required: true,
        trim: true,
    },
    selectedTracks: [String],
    selectedUnits: [String],
    creditCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Student = mongoose.model('Student', studentSchema);

export default Student;