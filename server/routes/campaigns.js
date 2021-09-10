import express from 'express';
import {
  createCampaign,
  deleteCampaign,
  getCampaigns,
  getCurrentCampaign,
  updateCampaign
} from '../controllers/campaigns.js';
import { authUser, authRole } from '../middleware/AuthM.js';

const router = express.Router();

router.get('/', authUser, authRole('admin'), getCampaigns);
router.post('/add', authUser, authRole('admin'), createCampaign);
router.delete('/:id', authUser, authRole('admin'), deleteCampaign);
router.get('/currentCampaign', authUser, getCurrentCampaign);
router.patch('/:id', authUser, authRole('admin'), updateCampaign);

export default router;
