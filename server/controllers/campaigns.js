import mongoose from 'mongoose';
import Campaign from '../models/campaign.model.js';

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const createCampaign = async (req, res) => {
  const { academicYear, tracks, units, current } = req.body;

  try {
    const campaign = await Campaign.findOne({ academicYear });
    if (campaign)
      return res
        .status(400)
        .json({ msg: 'campaign with the same academic year already exists' });
    const result = await Campaign.create({
      academicYear,
      tracks,
      units,
      current,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
};

export const deleteCampaign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No campaign with that ID');

  await Campaign.findByIdAndRemove(id);

  res.json('campaign deleted');
};

export const updateCampaign = async (req, res) => {
  const { id } = req.params;
  const campaign = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No campaign with that ID');

  const updatedCampaign = await Campaign.findByIdAndUpdate(id, campaign, {
    new: true,
  });

  res.json(updatedCampaign);
};

export const getCurrentCampaign = async (req, res) => {
  const currentCampaign = await Campaign.findOne({ current: true });

  if (!currentCampaign) return res.status(404).send('No Current Campaign');
  res.status(200).json(currentCampaign);
};
