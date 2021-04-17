import React, { useState, useContext } from 'react';
import StudentContext from '../../Context/Student/StudentContext';
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

export default function AddStudentPopup({
  handleAddStudentPopupClose,
  addStudentPopupOpen,
}) {
  const classes = useStyles();
  const studentContext = useContext(StudentContext);
  const [student, setStudent] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    regNumber: '',
    creditCount: 0,
  });

  const {
    email,
    firstName,
    lastName,
    password,
    regNumber,
    creditCount,
  } = student;

  function onChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    studentContext.addStudent(student);
    setStudent({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      regNumber: '',
      creditCount: 0,
    });
    handleAddStudentPopupClose()
  }
  console.log(studentContext.students);
  return (
    <>
    
      <Dialog open={addStudentPopupOpen} onClose={handleAddStudentPopupClose}>
    <form>
        <DialogTitle name='form-dialog-title'>
          Add Student To Current List
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
            name='password'
            placeholder='Password'
            type='text'
            value={password}
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
          <DialogContentText>
            *Please note that after adding a student you will not be able update
            their password as it will be automatically encrypted and inserted in
            the database, alternatively you can delete your entry and make a new
            one with a new password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleAddStudentPopupClose} color='secondary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            
            onClick={onSubmit}
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
    </form>
      </Dialog>
    
    </>
  );
}
