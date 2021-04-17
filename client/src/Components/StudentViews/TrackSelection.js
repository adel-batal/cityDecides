import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {Grid, Button} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { motion } from 'framer-motion'

import { useStyles } from '../../Hooks/StylesHook'
import { SlideInOut } from "../../Animations/SlideAnimation";

export default function TrackSelction({tracks, updateTracks}) {
    const [isDiv, setIsDiv] = useState(false)
    const classes = useStyles();
    const AnimatedDiv = isDiv ? 'div' : motion.div


    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(tracks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        updateTracks(items)
    }
    return (
        <AnimatedDiv
            initial='initial' animate='in' exit='out'
            variants={SlideInOut}
            onMouseMove={() => setIsDiv(true)}
        >
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                className={'centered-container standard-container' }

            >

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tracks">
                        {(provided) => (
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                className={classes.root}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tracks.map(({ id, name }, index) => {
                                    return <Draggable key={id} draggableId={id} index={index}>
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
                                })}
                                {provided.placeholder}
                            </Grid>

                        )}
                    </Droppable>
                </DragDropContext>
                <div className={`selectionListComponent__next-button-container ${classes.mr2}`}>
                    <Link to={'./unitSelection'}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={`${classes.button} ${classes.mb1} `}
                            endIcon={<SendIcon />}
                            onClick={() => setIsDiv(false)}
                        >
                            Next
                    </Button>
                    </Link>
                </div>


            </Grid>

        </AnimatedDiv>


    )
}