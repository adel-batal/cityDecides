import React, { useState, useEffect, useContext } from 'react';
import AddStudentPopup from './AddStudentPopup';
import { Paper, Button } from '@material-ui/core';

import StudentDatatable from './StudentDatatable';
import { useStyles, usePaperStyles } from '../../Hooks/StylesHook';

import GenerateIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Cached';
import { Link } from 'react-router-dom';

import AuthContext from '../../Context/Auth/AuthContext';

export default function AdminConsole() {
  const { loadUser } = useContext(AuthContext);
  const classes = useStyles();
  const paperClasses = usePaperStyles();
  const [data, setData] = useState([]);
  const [addStudentPopupOpen, setAddStudentPopupOpen] = useState(false);



  const handleAddStudentPopupOpen = () => {
    setAddStudentPopupOpen(true);
  };

  const handleAddStudentPopupClose = () => {
    setAddStudentPopupOpen(false);
  };


  return (
    <>
      {addStudentPopupOpen && (
        <AddStudentPopup
          handleAddStudentPopupClose={handleAddStudentPopupClose}
          addStudentPopupOpen={addStudentPopupOpen}
        />
      )}
      <div className='admin_admin-console'>
        <Paper elevation={3} className={`${paperClasses.paper} ${classes.mb1}`}>
          <div className={classes.root}>
            <Button
              type='button'
              color='primary'
              startIcon={<AddIcon />}
              onClick={handleAddStudentPopupOpen}
            >
              Add Student
            </Button>
            <Button
              type='button'
              color='primary'
              startIcon={<UpdateIcon />}
              onClick={handleAddStudentPopupOpen}
            >
              Update Student
            </Button>
            <Button type='button' color='primary' startIcon={<DeleteIcon />}>
              Remove
            </Button>
          </div>
        </Paper>
        <StudentDatatable data={data} />
        <Paper elevation={3} className={`${paperClasses.paper} ${classes.mt1}`}>
          <div className={classes.justifyRight}>
            <Link to='/decisionReport'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                className={classes.button}
                endIcon={<GenerateIcon />}
              >
                generate report
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
}
