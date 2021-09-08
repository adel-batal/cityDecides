import express from 'express';
import {
  addUser,
  deleteUser,
  login,
  getLoggedInUser,
  updateUser,
  getUsers,
} from '../controllers/users.js';
import { authUser, authRole } from '../middleware/AuthM.js';

const router = express.Router();

router.post('/add', /* authUser, authRole('admin'), */ addUser);
router.get('/authAdmin', authUser, authRole('admin'), getLoggedInUser);
router.get('/authStudent', authUser, authRole('student'), getLoggedInUser);
router.patch('/:email', authUser, authRole('admin'), updateUser);
router.delete('/:email', authUser, authRole('admin'), deleteUser);
router.post('/login', login);
router.get('/', authUser, authRole('admin'), getUsers);

export default router;
