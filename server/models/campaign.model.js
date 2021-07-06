import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tracks: [Object],
  units: [Object],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  current: {
    type: Boolean,
  },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
