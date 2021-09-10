import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

import { SlideInOut } from '../../Animations/SlideAnimation';
import { useStyles } from '../../Hooks/StylesHook';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import SelectionsContext from '../../Context/Selections/SelectionsContext';

import BackIcon from '@material-ui/icons/ArrowBackIos';

export default function UnitSelection() {
  const LOCAL_STORAGE_KEY = 'cityDecides.selections';
  const LOCAL_STORAGE_KEY_UNITS_ORDERED =
    'cityDecides.selections.units.ordered';
  const campaignContext = useContext(CampaignContext);
  const selectionsContext = useContext(SelectionsContext);
  const { getCurrentCampaign, currentCampaign } = campaignContext;
  const { tracks } = selectionsContext;

  const [isDiv, setIsDiv] = useState(false);
  const [thisUnits, updateThisUnits] = useState(currentCampaign.units);
  const classes = useStyles();
  const AnimatedDiv = isDiv ? 'div' : motion.div;
  useEffect(() => {
    getCurrentCampaign();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const CampaignJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    updateThisUnits(JSON.parse(CampaignJSON).units);
  }, []);

  useEffect(() => {
    currentCampaign &&
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentCampaign));
  }, [currentCampaign]);
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_UNITS_ORDERED,
      JSON.stringify(thisUnits)
    );
  }, [thisUnits]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(thisUnits);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateThisUnits(items);
  }

  function handleNext() {
    setIsDiv(false);
  }

  console.log(tracks);

  return (
    <AnimatedDiv
      initial='initial'
      animate='in'
      exit='out'
      variants={SlideInOut}
      onMouseMove={() => setIsDiv(true)}
    >
      <Grid
        container
        direction='column'
        justify='space-between'
        alignItems='center'
        className='centered-container standard-container'
      >
        <p className={classes.indented}>
          Drag and drop units according to your preference.
        </p>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='units'>
            {(provided) => (
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                className={classes.root}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {thisUnits &&
                  thisUnits.map(({ id, name }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div
                            className='track-selection__track-option'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {name}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <div>
              <Link to={'./trackSelection'}>
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
            <div>
              <Link to={'./selectionReport'}>
                <Button
                  variant='contained'
                  color='primary'
                  className={`${classes.button} ${classes.mb1} ${classes.indented}`}
                  endIcon={<SendIcon />}
                  onClick={handleNext}
                >
                  Show me my selections
                </Button>
              </Link>
            </div>
          </Grid>
        </div>
      </Grid>
    </AnimatedDiv>
  );
}
