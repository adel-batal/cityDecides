import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

import { useStyles } from '../../Hooks/StylesHook';
import { SlideInOut } from '../../Animations/SlideAnimation';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import AuthContext from '../../Context/Auth/AuthContext';


/* import SelectionsContext from '../../Context/Selections/SelectionsContext';
 */
export default function TrackSelction() {
  const LOCAL_STORAGE_KEY = 'cityDecides.selections';
  const LOCAL_STORAGE_KEY_TRACKS_ORDERED =
    'cityDecides.selections.tracks.ordered';
  const campaignContext = useContext(CampaignContext);
  const authContext = useContext(AuthContext);
  /*   const selectionsContext = useContext(SelectionsContext);
   */
  const { getCurrentCampaign, currentCampaign } = campaignContext;
  const { loadStudentUser } = authContext;
  /* const { setSelections } = selectionsContext; */
  const [isDiv, setIsDiv] = useState(false);
  const [thisTracks, updateThisTracks] = useState(null);
  const classes = useStyles();
  const AnimatedDiv = isDiv ? 'div' : motion.div;

  useEffect(() => {
    loadStudentUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getCurrentCampaign();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const CampaignJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    CampaignJSON && updateThisTracks(JSON.parse(CampaignJSON).tracks);
  }, []);

  useEffect(() => {
    currentCampaign &&
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentCampaign));
    updateThisTracks(currentCampaign.tracks);
  }, [currentCampaign]);
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_TRACKS_ORDERED,
      JSON.stringify(thisTracks)
    );
  }, [thisTracks]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(thisTracks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    /* updateCurrentChoices({selectedTracks: items}); */
    updateThisTracks(items);
  }

  function handleNext() {
    /* setSelections({tracks: thisTracks}) */
    setIsDiv(false);
  }
  console.log(currentCampaign.tracks);
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
        className={'centered-container standard-container'}
        >
        <p className={classes.indented}>Drag and drop tracks according to your preference.</p>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='tracks'>
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
                {thisTracks &&
                  thisTracks.map(({ id, name }, index) => {
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
        <div
          className={`selectionListComponent__next-button-container ${classes.mr2}`}
        >
          <Link to={'./unitSelection'}>
            <Button
              variant='contained'
              color='primary'
              className={`${classes.button} ${classes.mb1} `}
              endIcon={<SendIcon />}
              onClick={handleNext}
            >
              Next
            </Button>
          </Link>
        </div>
      </Grid>
    </AnimatedDiv>
  );
}
