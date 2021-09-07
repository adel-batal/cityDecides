import React, { useState, useContext, useEffect } from 'react';
import StudentContext from '../../Context/Student/StudentContext';
import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';

import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  DialogTitle,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { useStyles, useformControlStyles } from '../../Hooks/StylesHook';

export default function AddStudentPopup({
  form,
  setForm,
}) {
  const classes = useStyles();
  const formControlClasses = useformControlStyles();
  const studentContext = useContext(StudentContext);
  const authContext = useContext(AuthContext);
  const campaignContext = useContext(CampaignContext);
  const notificationContext = useContext(NotificationContext);
  
  const [student, setStudent] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    regNumber: '',
    creditCount: '',
    academicYear: '',
  });
  
  const { campaigns } = campaignContext;
  const {
    email,
    firstName,
    lastName,
    password,
    regNumber,
    creditCount,
    academicYear,
  } = student;
  
  const { register, error, clearErrors } = authContext;
  const { setNotification } = notificationContext;
  const { addStudent } = studentContext;
  
  //experimental
  useEffect(() => {
    if (error === 'user already exists' || error === 'student already exists') {
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

  async function onSubmit(e) {
    e.preventDefault();

    if (
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      regNumber === '' ||
      academicYear === '' ||
      email === ''
    ) {
      setNotification(
        'Please fill all fields marked with a star',
        'error',
        true
      );
      return;
    }

    await register({
      email: email,
      password: password,
      role: 'student',
    });
    addStudent({
      email: email,
      firstName: firstName,
      lastName: lastName,
      regNumber: regNumber,
      creditCount: parseInt(creditCount),
      academicYear: academicYear,
    });
    if (error === null) {
      setStudent({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        regNumber: '',
        creditCount: 0,
        academicYear: '',
      });
      setForm({open: false});
     
    }
  }

  console.log(error);
  return (
    <>
      <Dialog open={form.open}>
        <form className={formControlClasses.root}>
          <DialogTitle name='form-dialog-title'>
            Add Student To Current List
          </DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              className={classes.mb1}
              name='email'
              type='email'
              placeholder='Email Address*'
              value={email}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='firstName'
              placeholder='First Name*'
              type='text'
              value={firstName}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='lastName'
              placeholder='Last Name*'
              type='text'
              value={lastName}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='password'
              placeholder='Password**'
              type='text'
              value={password}
              onChange={onChange}
              fullWidth
            />
            <Input
              className={classes.mb1}
              name='regNumber'
              placeholder='Registration Number*'
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
                Academic Year*
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
                  <MenuItem key={campaign._id} value={campaign.academicYear}>
                    {campaign.academicYear}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />
            <br />
            <DialogContentText>
              **Please note that after adding a student you will not be able
              update their password as it will be automatically encrypted and
              inserted in the database, alternatively you can delete your entry
              and make a new one with a new password.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type='button'
              onClick={() => setForm({open: false})}
              color='secondary'
            >
              Cancel
            </Button>
            <Button variant='contained' onClick={onSubmit} color='primary'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
