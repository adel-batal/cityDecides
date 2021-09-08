import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 12,
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
