import React, { useContext, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Grid, Button } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import SubmitIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { useStyles } from '../../Hooks/StylesHook';
import { SlideInOut } from '../../Animations/SlideAnimation';
import SelectionsContext from '../../Context/Selections/SelectionsContext';
import AuthContext from '../../Context/Auth/AuthContext';
import StudentContext from '../../Context/Student/StudentContext';

export default function StudentSelectionReport() {
  const LOCAL_STORAGE_KEY_TRACKS_ORDERED =
    'cityDecides.selections.tracks.ordered';
  const LOCAL_STORAGE_KEY_UNITS_ORDERED =
    'cityDecides.selections.units.ordered';
  const classes = useStyles();
  const selectionsContext = useContext(SelectionsContext);
  const authContext = useContext(AuthContext);
  const studentContext = useContext(StudentContext);

  const { setSelections, tracks, units } = selectionsContext;
  const { submitSelections } = studentContext;
  const { user } = authContext;

  useEffect(() => {
    const TracksJson = localStorage.getItem(LOCAL_STORAGE_KEY_TRACKS_ORDERED);
    const UnitsJson = localStorage.getItem(LOCAL_STORAGE_KEY_UNITS_ORDERED);
    if (TracksJson !== '' && UnitsJson !== '') {
      setSelections({
        tracks: JSON.parse(TracksJson),
        units: JSON.parse(UnitsJson),
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmitSelections = () => {
    submitSelections(user.email, tracks, units);
  };

  console.log(tracks, units);
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
            {tracks.map(({ id, name }) => {
              return (
                <li className={classes.indented} key={id}>
                  {name}
                </li>
              );
            })}
          </ul>
        </Grid>
        <Grid item xs={6}>
          <h4>Units in the order you selected</h4>
          <ul>
            {units.map(({ id, name }) => {
              return (
                <li className={classes.indented} key={id}>
                  {name}
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
          <Link to={'./unitSelection'}> 
          <Button
            variant='contained'
            color='primary'
            className={`${classes.button} ${classes.mb1}`}
            startIcon={<BackIcon />}
          >
            Back
          </Button>
          </Link>
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
