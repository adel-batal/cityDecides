import express from 'express';
import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudent,
  submitSelections
} from '../controllers/students.js';
import middleWareAuth from '../middleware/middleWareAuth.js'

const router = express.Router();

router.get('/', /* middleWareAuth, */  getStudents);
router.post('/add', /* middleWareAuth, */ addStudent);
router.delete('/:id', middleWareAuth, deleteStudent);
router.patch('/:id', /* middleWareAuth, */ updateStudent);
router.get('/:id', middleWareAuth, getStudent);

//route to do:
router.post('/submitSelections', middleWareAuth, submitSelections);

export default router;
