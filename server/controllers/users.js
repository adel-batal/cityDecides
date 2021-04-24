import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';

export const addUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'user already exists' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      role,
    });
    //token video jwt mern 1:42:00
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No user with that ID');

  await User.findByIdAndRemove(id);

  res.json('user deleted');
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ msg: 'user does not exist' });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: 'invalid credentials' });
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        role: existingUser.role,
      },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const auth = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select('password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
