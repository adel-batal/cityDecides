import express from 'express';
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudent,
  submitSelections
} from '../controllers/students.js';
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router();

router.get('/', /* middleWareAuth, */  getStudents);
router.post('/add', /* middleWareAuth, */ addStudent);
router.delete('/:id', adminAuth, deleteStudent);
router.patch('/:id', /* middleWareAuth, */ updateStudent);
router.get('/:id', /* adminAuth, */ getStudent);

router.patch('/submitSelections/:email', /* middleWareAuth, */ submitSelections);

export default router;
