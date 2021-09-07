import express from 'express';
import {
  getAdmins,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getAdmin,
} from '../controllers/admins.js';
import { authUser, authRole } from '../middleware/AuthM.js';
const router = express.Router();

router.get('/', authUser, authRole('admin'), getAdmins);
router.post('/add', authUser, authRole('admin'), addAdmin);
router.delete('/:id', authUser, authRole('admin'), deleteAdmin);
router.patch('/:id', authUser, authRole('admin'), updateAdmin);
router.get('/:id', authUser, authRole('admin'), getAdmin);

export default router;
