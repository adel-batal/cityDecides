import React, { useContext, useEffect } from 'react';
/* import StudentContext from '../../Context/Student/StudentContext';
import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext'; */
import CampaignContext from '../../Context/Campaign/CampaignContext';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {
  Button,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';

export default function CampaignListForm({
  handleViewCampaignsFormClose,
  viewCampaignsFormOpen,
}) {
  const classes = useStyles();
  const campaignContext = useContext(CampaignContext);
/*   const notificationContext = useContext(NotificationContext);
 */
  const {
    campaigns,
    getCampaigns,
    updateCampaign,
    deleteCampaign,
    setCurrentCampaign,
    clearCurrentCampaign,
    /* currentCampaign, */
    getCurrentCampaign
  } = campaignContext;
  /* const { setNotification } = notificationContext; */

  useEffect(() => {
    getCampaigns();
    getCurrentCampaign()
    // eslint-disable-next-line
      }, []);

  /*   //experimental
  useEffect(() => {
    if (error === 'user already exists') {
      setNotification(error, 'error', true);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]); */

  function handleSetCurrentYear(e, c) {
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

  function handleDeleteCampaign(e, c) {
    if (!e.target.checked) {
      deleteCampaign(c);
    } else {
      //todo here add "are you sure you want to delete current, the whole system will stop working"
    }
  }
  
  return (
    <>
      <Dialog
        open={viewCampaignsFormOpen}
        onClose={handleViewCampaignsFormClose}
      >
        <form>
          <DialogTitle name='form-dialog-title'>All Campaigns</DialogTitle>
          <DialogContent>
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                className={`${classes.sameLine} ${classes.titleActionSpace}`}
              >
                <DialogContentText className={classes.noMargin}>
                  {campaign.academicYear}
                </DialogContentText>
                <div className={classes.sameLine}>
                  <DialogContentText className={classes.noMargin}>
                    Current:
                  </DialogContentText>
                  <Switch
                    checked={campaign.current}
                    onChange={(e) => handleSetCurrentYear(e, campaign)}
                    color='primary'
                    name='currentYear'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Fab
                    size='small'
                    color='primary'
                    aria-label='edit'
                    className={classes.margin}
                  >
                    <EditIcon />
                  </Fab>
                  <Fab
                    size='small'
                    color='secondary'
                    aria-label='delete'
                    className={classes.margin}
                    onClick={(e) => handleDeleteCampaign(e, campaign)}
                  >
                    <DeleteIcon />
                  </Fab>
                </div>
              </div>
            ))}
          </DialogContent>

          <DialogActions>
            <Button
              type='button'
              onClick={handleViewCampaignsFormClose}
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
