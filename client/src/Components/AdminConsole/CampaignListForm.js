import React, { useContext, useEffect, useState } from 'react';
import CampaignContext from '../../Context/Campaign/CampaignContext';

import ConfirmationDialogue from '../Layout/ConfirmationDialogue';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import {
  Button,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Collapse,
  Typography,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';

export default function CampaignListForm({ form, setForm }) {
  const classes = useStyles();
  const [confirmationDialogue, setConfirmationDialogue] = useState({
    type: '',
    open: false,
  });
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const [campaignInfoShowId, setCampaignInfoShowId] = useState('');
  const campaignContext = useContext(CampaignContext);
  const {
    campaigns,
    getCampaigns,
    updateCampaign,
    deleteCampaign,
    setCurrentCampaign,
    clearCurrentCampaign,
    getCurrentCampaign,
  } = campaignContext;

  useEffect(() => {
    getCampaigns();
    getCurrentCampaign();
    // eslint-disable-next-line
  }, []);

  function handleToggleCurrentYear(e, c) {
    const isChecked = e.target.checked;
    campaigns.forEach((campaign) => {
      if (isChecked) {
        if (campaign._id !== c._id) {
          campaign.current = false;
        } else {
          campaign.current = true;
        }
        updateCampaign(campaign);
        setCurrentCampaign(campaign);
      } else {
        campaign.current = false;
        updateCampaign(campaign);
        clearCurrentCampaign(campaign);
      }
    });
  }

  function handleDeleteCampaign() {
    deleteCampaign(campaignToDelete);
  }

  function handleConfirmationClose() {
    setConfirmationDialogue({ ...confirmationDialogue, open: false });
  }

  function handleCampaignInfoToggle(id) {
    if (id === campaignInfoShowId) {
      setCampaignInfoShowId('');
    } else {
      setCampaignInfoShowId(id);
    }
  }
  return (
    <>
      <Dialog open={form.open}>
        {confirmationDialogue.open && (
          <ConfirmationDialogue
            func={handleDeleteCampaign}
            content={`This action is irreversable, are you sure that you wish to delete the campaign ${campaignToDelete.academicYear}?`}
            isOpen={confirmationDialogue.open}
            close={handleConfirmationClose}
            successMsg={`Campaign ${campaignToDelete.academicYear} has been deleted successfully!`}
          />
        )}
        <form>
          <DialogTitle name='form-dialog-title'>All Campaigns</DialogTitle>
          <DialogContent>
            {campaigns.map((campaign) => (
              <div key={campaign._id}>
                <div
                  className={`${classes.sameLine} ${classes.titleActionSpace}`}
                >
                  <Typography className={classes.noMargin}>
                    {campaign.academicYear}
                  </Typography>
                  <div className={classes.sameLine}>
                    <Typography className={classes.noMargin}>
                      Current:
                    </Typography>
                    <Switch
                      checked={campaign.current}
                      onChange={(e) => handleToggleCurrentYear(e, campaign)}
                      color='primary'
                      name='currentYear'
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Fab
                      size='small'
                      color='primary'
                      aria-label='edit'
                      className={classes.margin}
                      onClick={() => handleCampaignInfoToggle(campaign._id)}
                    >
                      <InfoIcon />
                    </Fab>
                    <Fab
                      size='small'
                      color='secondary'
                      aria-label='delete'
                      name={campaign}
                      className={classes.margin}
                      onClick={() => {
                        setConfirmationDialogue({
                          ...confirmationDialogue,
                          open: true,
                        });
                        setCampaignToDelete(campaign);
                      }}
                    >
                      <DeleteIcon />
                    </Fab>
                  </div>
                </div>
                <Collapse in={campaign._id === campaignInfoShowId}>
                  {campaign.tracks.length > 0 ? (
                    <>
                      <Typography variant='h6'>Tracks</Typography>
                      {campaign.tracks.map((track) => (
                        <Typography key={track.id}>{track.name}</Typography>
                      ))}
                      <br />
                      <Typography variant='h6'>Units</Typography>
                      {campaign.units.map((unit) => (
                        <Typography key={unit.id}>{unit.name}</Typography>
                      ))}
                    </>
                  ) : (
                    <Typography>
                      This Campaign has no tracks or units yet.
                    </Typography>
                  )}
                </Collapse>
              </div>
            ))}
          </DialogContent>

          <DialogActions>
            <Button
              type='button'
              onClick={() => setForm({ open: false })}
              color='secondary'
            >
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
