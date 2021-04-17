import express from 'express';
import { getAdmins, login } from '../controllers/admins.js'
const router = express.Router()

router.get('/', getAdmins)
router.post('login', login)


export default router