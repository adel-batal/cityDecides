import React, { useState, useEffect, useContext } from 'react';
import AddStudentPopup from './AddStudentPopup';
import UpdateStudentForm from './UpdateStudentForm';
import { Paper, Button } from '@material-ui/core';

import StudentDatatable from './StudentDatatable';
import { useStyles, usePaperStyles } from '../../Hooks/StylesHook';

import GenerateIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Cached';
import { Link } from 'react-router-dom';

import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext';
import StudentContext from '../../Context/Student/StudentContext';

export default function AdminConsole() {
  const studentContext = useContext(StudentContext);
  const { students, getStudents, checkedStudents, setCurrentStudent } = studentContext;
  const classes = useStyles();
  const paperClasses = usePaperStyles();
  const [addStudentPopupOpen, setAddStudentPopupOpen] = useState(false);
  const [updateStudentFormOpen, setUpdateStudentFormOpen] = useState(false);
  const notificationContext = useContext(NotificationContext);

  const { setNotification } = notificationContext;

  /*   useEffect(() => {
    if (error === 'user already exists') {
      setNotification(error, 'error', true);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]); */

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);
  const handleAddStudentPopupOpen = () => {
    setAddStudentPopupOpen(true);
  };

  const handleAddStudentPopupClose = () => {
    setAddStudentPopupOpen(false);
  };
  const handleUpdateStudentFromOpen = () => {
    if(checkedStudents.length === 0){
      setNotification('Please Select At Least One Student', 'error', true)
      return
    } else if(checkedStudents.length > 1){
      setNotification('Please Select One Student At a Time To Update', 'error', true)
      return
    }
    setCurrentStudent(checkedStudents[0])
    setUpdateStudentFormOpen(true);
  };

  const handleUpdateStudentFormClose = () => {
    setUpdateStudentFormOpen(false);
  };
console.log(checkedStudents)
  return (
    <>
      {addStudentPopupOpen && (
        <AddStudentPopup
          handleAddStudentPopupClose={handleAddStudentPopupClose}
          addStudentPopupOpen={addStudentPopupOpen}
        />
      )}
      {updateStudentFormOpen && (
        <UpdateStudentForm
          handleUpdateStudentFormClose={handleUpdateStudentFormClose}
          updateStudentFormOpen={updateStudentFormOpen}
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
              onClick={handleUpdateStudentFromOpen}
            >
              Update Student
            </Button>
            <Button type='button' color='primary' startIcon={<DeleteIcon />}>
              Remove
            </Button>
          </div>
        </Paper>
        <StudentDatatable />
        <Paper elevation={3} className={`${paperClasses.paper} ${classes.mt1}`}>
          <div className={classes.justifyRight}>
            <a href='/decisionReport'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                className={classes.button}
                endIcon={<GenerateIcon />}
              >
                generate report
              </Button>
            </a>
          </div>
        </Paper>
      </div>
    </>
  );
}
