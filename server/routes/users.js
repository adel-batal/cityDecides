import express from 'express';
import {
  addUser,
  deleteUser,
  login
} from '../controllers/users.js';
import auth from '../middleware/auth.js'


const router = express.Router();

router.post('/add', /* auth, */ addUser);
router.delete('/:id', auth, deleteUser);
router.post('/login', login);

export default router;