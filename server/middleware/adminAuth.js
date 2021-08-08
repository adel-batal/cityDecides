import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';

const adminAuth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtAdminSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token not valid' });
  }
};
export default adminAuth;
