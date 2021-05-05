import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';

export const addUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'user already exists' });
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

/* export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No user with that ID');

  await User.findByIdAndRemove(_id);

  res.json('user deleted');
}; */
export const deleteUser = async (req, res) => {
  const { email } = req.params;

  User.findOneAndRemove({email: email}).exec()
  res.json('user deleted');
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: 'user does not exist' });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'invalid credentials' });
    }
    const payload = {
      user: {
        email: user.email,
        id: user._id,
      },
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).send('server error');
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
