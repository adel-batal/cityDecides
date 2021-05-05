import express from 'express';
import {
  addUser,
  deleteUser,
  login,
  getLoggedInUser
} from '../controllers/users.js';
import middleWareAuth from '../middleware/middleWareAuth.js'


const router = express.Router();

router.post('/add', /* middleWareAuth,  */addUser);
router.get('/auth',  middleWareAuth, getLoggedInUser);
router.delete('/:email', /* middleWareAuth, */ deleteUser);
router.post('/login', login);

export default router;