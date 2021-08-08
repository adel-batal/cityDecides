import express from 'express';
import {
  addUser,
  deleteUser,
  login,
  getLoggedInUser
} from '../controllers/users.js';
import adminAuth from '../middleware/adminAuth.js'
import studentAuth from '../middleware/studentAuth.js'


const router = express.Router();

router.post('/add', /* middleWareAuth,  */addUser);
router.get('/studentAuth',  studentAuth, getLoggedInUser);
router.get('/adminAuth',  adminAuth, getLoggedInUser);
router.delete('/:email', /* middleWareAuth, */ deleteUser);
router.post('/login', login);

export default router;