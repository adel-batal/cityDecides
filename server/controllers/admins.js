import mongoose from 'mongoose'
import Admin from '../models/admin.model.js'

export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find()

        res.status(200).json(admins)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await Admin.findOne({ email });
  
      if (!existingUser)
        return res.status(404).json({ message: 'user does not exist' });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: 'invalid credentials' });
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id},
        config.jwtSecret,
        { expiresIn: '1h' }
      );
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: 'something went wrong' });
    }
  };
  