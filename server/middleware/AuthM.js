import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';

export const authUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'token not valid' });
  }
};
export function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send('Not allowed');
    }

    next();
  };
}
