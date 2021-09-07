import express from 'express';
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudent,
  submitSelections
} from '../controllers/students.js';
import { authUser, authRole } from '../middleware/AuthM.js';
const router = express.Router();

router.get('/', authUser, authRole('admin'),  getStudents);
router.post('/add', authUser, authRole('admin'), addStudent);
router.delete('/:id', authUser, authRole('admin'), deleteStudent);
router.patch('/:id', authUser, authRole('admin'), updateStudent);
router.get('/:id', authUser, authRole('admin'), getStudent);

router.patch('/submitSelections/:email', authUser, authRole('student'), submitSelections);

export default router;
