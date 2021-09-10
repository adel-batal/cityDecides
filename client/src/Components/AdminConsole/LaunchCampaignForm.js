import React, { useState, useContext } from 'react';

import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Button,
  FormHelperText,
  Input,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';

export default function AddStudentPopup({ form, setForm }) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const campaignContext = useContext(CampaignContext);
  const notificationContext = useContext(NotificationContext);
  const [campaign, setCampaign] = useState({
    academicYear: '',
    tracks: [],
    units: [],
    current: false,
  });
  const [elementsCount, setElementsCount] = useState({
    tracksCount: 1,
    unitsCount: 1,
  });

  const { tracksCount, unitsCount } = elementsCount;

  const { academicYear, tracks, units, current } = campaign;
  const { createCampaign, campaigns, updateCampaign } = campaignContext;
  const { setNotification } = notificationContext;
  const { error } = authContext;

  function handleAddSelection(type) {
    if (type === 'track') {
      const newTracks = [...tracks];
      setElementsCount({ ...elementsCount, tracksCount: tracksCount + 1 });
      newTracks.push({ id: tracksCount, name: '' });
      setCampaign({ ...campaign, tracks: newTracks });
    } else {
      const newUnits = [...units];
      setElementsCount({ ...elementsCount, unitsCount: unitsCount + 1 });
      newUnits.push({ id: unitsCount, name: '' });
      setCampaign({ ...campaign, units: newUnits });
    }
  }

  function handleElementDelete(type) {
    if (type === 'track') {
      const newTracks = [...tracks];
      setElementsCount({ ...elementsCount, tracksCount: tracksCount - 1 });
      newTracks.pop();
      setCampaign({ ...campaign, tracks: newTracks });
    } else {
      const newUnits = [...units];
      setElementsCount({ ...elementsCount, unitsCount: unitsCount - 1 });
      newUnits.pop();
      setCampaign({ ...campaign, units: newUnits });
    }
  }

  function onchange(e, type) {
    if (type === 'academicYear') {
      setCampaign({
        ...campaign,
        academicYear: e.target.value,
      });
    } else if (type === 'track') {
      const newTracks = [...tracks];
      newTracks[e.target.name] = { id: e.target.name, name: e.target.value };
      setCampaign({
        ...campaign,
        tracks: newTracks,
      });
    } else {
      const newUnits = [...units];
      newUnits[e.target.name] = { id: e.target.name, name: e.target.value };
      setCampaign({
        ...campaign,
        units: newUnits,
      });
    }
  }

  function handleCurrentCampaignChange() {
    setCampaign({ ...campaign, current: !current });
  }

  function existsCurrent() {
    if (current) {
      campaigns.forEach((campaign) => {
        if (campaign.current) {
          campaign.current = false;
          updateCampaign(campaign);
        }
      });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    existsCurrent();
    createCampaign(campaign);
    if (error === null) {
      setForm({ open: false });
      setNotification('Campaign was launched successfully!');
    }
  }

  function renderElementList(list, type) {
    return list.map((listElement) => (
      <div key={listElement.id}>
        <Input
          autoFocus
          className={classes.mb1}
          name={listElement.id.toString()}
          type='text'
          placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} #${
            listElement.id
          }`}
          onChange={(e) => onchange(e, type)}
        />

        <Fab
          size='small'
          color='secondary'
          aria-label='delete'
          className={classes.margin}
          onClick={() => handleElementDelete(type)}
        >
          <DeleteIcon />
        </Fab>
      </div>
    ));
  }
  return (
    <>
      <Dialog open={form.open}>
        <form>
          <DialogTitle name='form-dialog-title'>
            Launch a New Campaign
          </DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              className={classes.mb1}
              name='academicYear'
              type='text'
              placeholder='Academic Year'
              value={academicYear}
              onChange={(e) => onchange(e, 'academicYear')}
              fullWidth
            />
            <FormHelperText className={classes.helperText}>
              e.g. 2021-2022
            </FormHelperText>
            <br />
            <DialogContentText>Tracks</DialogContentText>
            {renderElementList(tracks, 'track')}
            <Fab
              size='small'
              color='primary'
              aria-label='add'
              className={classes.margin}
              onClick={() => handleAddSelection('track')}
            >
              <AddIcon />
            </Fab>
            <br />
            <br />
            <DialogContentText>Units</DialogContentText>
            {renderElementList(units, 'unit')}
            <Fab
              size='small'
              color='primary'
              aria-label='add'
              className={classes.margin}
              onClick={() => handleAddSelection('unit')}
            >
              <AddIcon />
            </Fab>
            <br />
            <br />

            <div className={classes.sameLine}>
              <DialogContentText className={classes.noMargin}>
                Make Current
              </DialogContentText>
              <Switch
                checked={current}
                onChange={handleCurrentCampaignChange}
                color='primary'
                name='current'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button
              type='button'
              onClick={() => setForm({ open: false })}
              color='secondary'
            >
              Cancel
            </Button>
            <Button variant='contained' onClick={onSubmit} color='primary'>
              Launch
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
