import React, { useContext } from 'react';

import { motion } from 'framer-motion';
import { Grid, Button } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import SubmitIcon from '@material-ui/icons/ArrowForwardIos';

import { useStyles } from '../../Hooks/StylesHook';
import { SlideInOut } from '../../Animations/SlideAnimation';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import AuthContext from '../../Context/Auth/AuthContext';
import StudentContext from '../../Context/Student/StudentContext';

export default function StudentSelectionReport() {
  const classes = useStyles();
  const campaignContext = useContext(CampaignContext);
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);

  const { currentChoices } = campaignContext;
  const { submitSelections } = studentContext;
  const { user } = authContext;
  const handleSubmitSelections = () => {
    submitSelections(user.email, currentChoices.selectedTracks, currentChoices.selectedUnits);
  };
  console.log(currentChoices)

  return (
    <motion.div
      className='centered-container report-container'
      initial='initial'
      animate='in'
      exit='out'
      variants={SlideInOut}
    >
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='flex-start'
        className={classes.lineSpace1}
      >
        <Grid item xs={6}>
          <h4>Tracks in the order you selected</h4>
          <ul>
            {currentChoices.selectedTracks.map(({ id, trackName }) => {
              return (
                <li className={classes.indented} key={id}>
                  {trackName}
                </li>
              );
            })}
          </ul>
        </Grid>
        <Grid item xs={6}>
          <h4>Units in the order you selected</h4>
          <ul>
            {currentChoices.selectedUnits.map(({ id, unitName }) => {
              return (
                <li className={classes.indented} key={id}>
                  {unitName}
                </li>
              );
            })}
          </ul>
        </Grid>
      </Grid>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <div className='selectionListComponent__next-button'>
          <Button
            variant='contained'
            color='primary'
            className={`${classes.button} ${classes.mb1}`}
            startIcon={<BackIcon />}
          >
            Back
          </Button>
        </div>
        <div className='selectionListComponent__next-button'>
          <Button
            variant='contained'
            color='primary'
            className={`${classes.button} ${classes.mb1}`}
            endIcon={<SubmitIcon />}
            onClick={handleSubmitSelections}
          >
            Submit
          </Button>
        </div>
      </Grid>
    </motion.div>
  );
}
