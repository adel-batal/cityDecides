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

export default function UpdateStudentForm({ form, setForm }) {
  const classes = useStyles();
  const studentContext = useContext(StudentContext);
  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);
  const campaignContext = useContext(CampaignContext);
  const { uncheckStudent, updateStudent, currentStudent, clearCurrentStudent } =
    studentContext;
  const {error, clearErrors } = authContext;
  const { campaigns } = campaignContext;
  const { setNotification } = notificationContext;
  useEffect(() => {
    clearErrors()
    if (currentStudent !== null) {
      setStudent(currentStudent);
    } else {
      setStudent({
        firstName: '',
        lastName: '',
        regNumber: '',
        creditCount: 0,
        academicYear: '',
      });
    }
    // eslint-disable-next-line
  }, [studentContext, currentStudent]);
  const [isEdited, setIsEdited] = useState(false);
  const [student, setStudent] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    regNumber: '',
    creditCount: 0,
    academicYear: '',
  });

  const { firstName, lastName, regNumber, creditCount, academicYear } =
    student;

  useEffect(() => {
    if (error === 'user already exists') {
      setNotification(error, 'error');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  function onChange(e) {
    setIsEdited(true);
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    updateStudent(student);
    if (error === null) {
      uncheckStudent(student);
      setForm({ open: false });
      setNotification('Student was updated successfully!', 'success');
    } else {
      setNotification(error, 'error');
    }
  }
  console.log({...currentStudent})
  return (
    <>
      <Dialog open={form.open}>
        <form>
          <DialogTitle>
            Update Student: {`${student.firstName} ${student.lastName}`}
          </DialogTitle>
          <DialogContent>
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
              <InputLabel>Academic Year</InputLabel>
              <Select
                value={academicYear}
                name='academicYear'
                onChange={onChange}
                fullWidth
              >
                {campaigns.map((campaign) => (
                  <MenuItem
                    key={campaign.academicYear}
                    value={campaign.academicYear}
                  >
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
              onClick={() => {
                setForm({ open: false });
                clearCurrentStudent();
              }}
              color='secondary'
            >
              Cancel
            </Button>
            {isEdited ? (
              <Button variant='contained' onClick={onSubmit} color='primary'>
                Update
              </Button>
            ) : (
              <Button variant='contained' disabled>
                Update
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
