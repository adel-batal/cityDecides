import React from 'react'

import { motion } from 'framer-motion'
import {Grid, Button} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import SubmitIcon from '@material-ui/icons/ArrowForwardIos';

import { useStyles } from '../../Hooks/StylesHook'
import { SlideInOut } from "../../Animations/SlideAnimation";

export default function StudentSelectionReport({ tracks, units }) {
    const classes = useStyles();

    return (
        <motion.div
            className='centered-container report-container'
            initial='initial' animate='in' exit='out' variants={SlideInOut}
        >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                className={classes.lineSpace1}
            >

                <Grid item xs={6}>
                    <h4>Tracks in the order you selected</h4>
                    <ul>
                        {tracks.map(({ id, name }) => {
                            return (
                                <li
                                    className={classes.indented}
                                    key={id}>
                                    {name}
                                </li>
                            )
                        })}
                    </ul>
                </Grid>
                <Grid item xs={6}>
                    <h4>Units in the order you selected</h4>
                    <ul>
                        {units.map(({ id, name }) => {
                            return (
                                <li
                                    className={classes.indented}
                                    key={id}
                                >
                                    {name}
                                </li>
                            )
                        })}
                    </ul>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <div className='selectionListComponent__next-button'>

                    <Button
                        variant="contained"
                        color="primary"
                        className={`${classes.button} ${classes.mb1}`}
                        startIcon={<BackIcon />}
                    >
                        Back
                    </Button>
                </div>
                <div className='selectionListComponent__next-button'>

                    <Button
                        variant="contained"
                        color="primary"
                        className={`${classes.button} ${classes.mb1}`}
                        endIcon={<SubmitIcon />}
                    >
                        Submit
                    </Button>
                </div>
            </Grid>
        </motion.div>
    )
}
