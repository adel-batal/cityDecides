import mongoose from 'mongoose';
import Admin from '../models/admin.model.js';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No admin with that ID');

  await Admin.findByIdAndRemove(id);

  res.json('admin deleted');
};
