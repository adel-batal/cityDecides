import express from 'express';
import {
  createCampaign,
  deleteCampaign,
  updateCampaign,
  getCampaigns,
  getCurrentCampaign,
} from '../controllers/campaigns.js';

import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', /* middleWareAuth, */ getCampaigns);
router.post('/add', /* middleWareAuth, */ createCampaign);
router.delete('/:id', /* middleWareAuth, */ deleteCampaign);
router.patch('/:id', /* middleWareAuth, */ updateCampaign);
router.get('/currentCampaign', getCurrentCampaign);

export default router;
