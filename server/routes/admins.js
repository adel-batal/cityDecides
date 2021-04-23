import express from 'express';
import { getAdmins, getAdmin, deleteAdmin } from '../controllers/admins.js'
const router = express.Router()

router.get('/', /*auth*/ getAdmins)
router.get('/:id',/*auth*/ getAdmin)
router.post('/:id', /*auth*/ deleteAdmin)

export default router