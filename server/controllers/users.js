import User from '../models/user.model.js';
import Student from '../models/student.model.js';
import Campaign from '../models/campaign.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const addUser = async (req, res) => {
  let { email, password, role } = req.body;
  email = email.toLowerCase();
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


export const deleteUser = async (req, res) => {
  const { email } = req.params;
  const existingUser = User.findOne({ email: email }).exec();
  if (!existingUser) return res.status(404).send('No user with that email');
  try {
    await User.findOneAndRemove({ email: email }).exec();
    res.json('user deleted');
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'invalid credentials' });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'invalid credentials' });
    }
    user = await User.findOne({ email }).select('-password');
    if (user.role === 'student') {
      const student = await Student.findOne({ email });
      const currentCampaign = await Campaign.findOne({ current: true });
      if (student.academicYear !== currentCampaign.academicYear) {
        return res.status(400).json({ msg: 'invalid credentials' });
      }
    }
    const payload = {
      user: {
        email: user.email,
        id: user._id,
        role: user.role,
        masterAdmin: user.masterAdmin,
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
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
