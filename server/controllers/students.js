import mongoose from 'mongoose';
import Student from '../models/student.model.js';
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const getStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No student with that ID');
  try {
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No student with that ID');
  try {
    await Student.findByIdAndRemove(id);
    res.json('student deleted');
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  let { regNumber, email, creditCount, academicYear, firstName, lastName } =
    req.body;
  email = email.toLowerCase();
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Student with that ID');
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { firstName, lastName, email, regNumber, creditCount, academicYear },
      {
        new: true,
      }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong', error: error });
  }
};
export const addStudent = async (req, res) => {
  let { regNumber, email, creditCount, academicYear, firstName, lastName } =
    req.body;
  email = email.toLowerCase();
  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'student already exists' });
    const result = await Student.create({
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
    const updatedStudent = await Student.findOneAndUpdate(
      {
        email: email,
      },
      { selectedTracks: selectedTracks, selectedUnits: selectedUnits },
      {
        new: true,
      }
    ).exec();
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};
