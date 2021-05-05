import React, { useState, useContext, useEffect } from 'react';
import StudentContext from '../../Context/Student/StudentContext';
import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext';

import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';

export default function UpdateStudentForm({
  handleUpdateStudentFormClose,
  updateStudentFormOpen,
}) {
  const classes = useStyles();
  const studentContext = useContext(StudentContext);
  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);
  const {
    uncheckStudent,
    updateStudent,
    currentStudent,
    clearCurrentStudent,
    checkedStudents,
  } = studentContext;

  useEffect(() => {
    if (currentStudent !== null) {
      setStudent(currentStudent);
    } else {
      setStudent({
        email: '',
        firstName: '',
        lastName: '',
        regNumber: '',
        creditCount: 0,
      });
    }
  }, [studentContext, currentStudent]);

  const [student, setStudent] = useState({
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    regNumber: '',
    creditCount: 0,
  });

  const { _id, email, firstName, lastName, regNumber, creditCount } = student;

  const { setNotification } = notificationContext;

  const { error, clearErrors } = authContext;

  //experimental
  useEffect(() => {
    if (error === 'user already exists') {
      setNotification(error, 'error', true);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  function onChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    //todo update from backend
    updateStudent(student);
    if (error === null) {
      uncheckStudent(student);
      clearCurrentStudent();
      handleUpdateStudentFormClose();
    }
  }
  console.log(checkedStudents);
  return (
    <>
      <Dialog
        open={updateStudentFormOpen}
        onClose={handleUpdateStudentFormClose}
      >
        <form>
          <DialogTitle name='form-dialog-title'>
            Update Student: {`${student.firstName} ${student.lastName}`}
          </DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              className={classes.mb1}
              name='email'
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='firstName'
              placeholder='First Name'
              type='text'
              value={firstName}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='lastName'
              placeholder='Last Name'
              type='text'
              value={lastName}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='regNumber'
              placeholder='Registration Number'
              type='text'
              value={regNumber}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='creditCount'
              placeholder='Credits'
              type='text'
              value={creditCount}
              onChange={onChange}
              fullWidth
            />
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              type='button'
              onClick={handleUpdateStudentFormClose}
              color='secondary'
            >
              Cancel
            </Button>
            <Button variant='contained' onClick={onSubmit} color='primary'>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
