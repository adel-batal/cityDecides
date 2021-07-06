import express from 'express';
import {
  createCampaign,
  deleteCampaign,
  updateCampaign,
  getCampaigns
} from '../controllers/campaigns.js';

import middleWareAuth from '../middleware/middleWareAuth.js';

const router = express.Router();

router.get('/', /* middleWareAuth, */ getCampaigns);
router.post('/add', /* middleWareAuth, */ createCampaign);
router.delete('/:id', /* middleWareAuth, */ deleteCampaign);
router.patch('/:id', /* middleWareAuth, */ updateCampaign);



export default router;
