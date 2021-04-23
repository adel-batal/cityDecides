import express from 'express';
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudent,
  submitSelections
} from '../controllers/students.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth,  getStudents);
router.post('/add', /* auth, */ addStudent);
router.delete('/:id', auth, deleteStudent);
router.patch('/:id', auth, updateStudent);
router.get('/:id', auth, getStudent);

//route to do:
router.post('/submitSelections', auth, submitSelections);

export default router;
