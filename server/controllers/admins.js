import mongoose from 'mongoose';
import Admin from '../models/admin.model.js';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const getAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No admin with that ID');
  try {
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No admin with that ID');
  try {
    await Admin.findByIdAndRemove(id);
    res.json('admin deleted');
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  let { regNumber, email, creditCount, academicYear, firstName, lastName } =
    req.body;
  email = email.toLowerCase();
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Admin with that ID');
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { firstName, lastName, email, regNumber, creditCount, academicYear },
      {
        new: true,
      }
    );
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong', error: error });
  }
};
export const addAdmin = async (req, res) => {
  let { regNumber, email, creditCount, academicYear, firstName, lastName } =
    req.body;
  email = email.toLowerCase();
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'admin already exists' });
    const result = await Admin.create({
      firstName,
      lastName,
      email,
      regNumber,
      creditCount,
      academicYear,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong', error });
  }
};

export const submitSelections = async (req, res) => {
  const { email } = req.params;
  const selectedTracks = req.body.selectedTracks;
  const selectedUnits = req.body.selectedUnits;
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      {
        email: email,
      },
      { selectedTracks: selectedTracks, selectedUnits: selectedUnits },
      {
        new: true,
      }
    ).exec();
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};