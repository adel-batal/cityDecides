import React, { useState, useContext, useEffect } from 'react';
import StudentContext from '../../Context/Student/StudentContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext';

import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const campaignContext = useContext(CampaignContext);
  const {
    uncheckStudent,
    updateStudent,
    currentStudent,
    clearCurrentStudent,
    checkedStudents,
  } = studentContext;
  const { campaigns } = campaignContext;

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
        academicYear: '',
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
    academicYear: '',
  });

  const { email, firstName, lastName, regNumber, creditCount, academicYear } =
    student;

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
  console.log(currentStudent.academicYear);
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
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-filled-label'>
                Academic Year
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={academicYear}
                name='academicYear'
                onChange={onChange}
                fullWidth
              >
                {campaigns.map((campaign) => (
                  <MenuItem value={campaign.academicYear}>
                    {campaign.academicYear}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
