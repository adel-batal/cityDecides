import mongoose from 'mongoose';
import Student from '../models/student.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No student with that ID');

  await Student.findByIdAndRemove(id);

  res.json('post deleted');
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const student = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No Student with that ID');

  const updatedStudent = await Student.findByIdAndUpdate(id, student, {
    new: true,
  });

  res.json(updatedStudent);
};

export const addStudent = async (req, res) => {
  const {
    regNumber,
    firstName,
    lastName,
    email,
    password,
    creditCount,
  } = req.body;

  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'user already exists' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await Student.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      regNumber,
      creditCount,
    });
    //token video jwt mern 1:42:00
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Student.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ msg: 'user does not exist' });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: 'invalid credentials' });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const submitSelections = async (req, res) => {
  const id = req.body._id;
  const student = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, student, {
      new: true,
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};
