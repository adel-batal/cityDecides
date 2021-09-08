import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 12
    },
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
    regNumber: {
        type: String,
        required: true,
        trim: true,
    },
    selectedTracks: [Object],
    selectedUnits: [Object],
    creditCount: {
        type: Number,
        default: 0
    },
    academicYear: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})
const Student = mongoose.model('Student', studentSchema);

export default Student;