import React, { useContext, useEffect, useState } from 'react';
import AdminContext from '../../Context/Admin/AdminContext';
import NotificationContext from '../../Context/Notification/NotificationContext';
import AuthContext from '../../Context/Auth/AuthContext';

import ConfirmationDialogue from '../Layout/ConfirmationDialogue';

import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Input,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';

export default function AdminListForm({ form, setForm }) {
  const classes = useStyles();
  const [confirmationDialogue, setConfirmationDialogue] = useState({
    type: '',
    open: false,
  });
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [showInputFields, setShowInputFields] = useState(false);
  const [adminToAdd, setAdminToAdd] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const adminContext = useContext(AdminContext);
  const notificationContext = useContext(NotificationContext);
  const authContext = useContext(AuthContext);
  const { admins, getAdmins, currentAdmin, deleteAdmin, addAdmin, setCurrentAdmin } =
    adminContext;
  const { setNotification } = notificationContext;
  const { register, deleteUser, user } = authContext;

  useEffect(() => {
    getAdmins();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if(user && user.role === 'admin'){
     setCurrentAdmin(user)
    }
     // eslint-disable-next-line
   }, []);

  function handleDeleteAdmin() {
    deleteAdmin(adminToDelete._id);
    deleteUser(adminToDelete.email);
  }

  function handleConfirmationClose() {
    setConfirmationDialogue({ ...confirmationDialogue, open: false });
  }
  function onChange(e) {
    setAdminToAdd({
      ...adminToAdd,
      [e.target.name]: e.target.value,
    });
  }

  function renderAddAdminInputFields() {
    return (
      <div className={classes.root}>
        <div className={classes.addAdminInputContainer}>
          <Input
            autoFocus
            className={classes.mb1}
            name='email'
            type='email'
            placeholder='Email'
            onChange={onChange}
          />
          <Input
            className={classes.mb1}
            name='password'
            type='text'
            placeholder='Password'
            onChange={onChange}
          />

          <Input
            className={classes.mb1}
            name='firstName'
            type='text'
            placeholder='First Name'
            onChange={onChange}
          />
          <Input
            className={classes.mb1}
            name='lastName'
            type='text'
            placeholder='Last Name'
            onChange={onChange}
          />
        </div>
        <div className={classes.addAdminButtonConatiner}>
          {adminToAdd.email === '' ||
          adminToAdd.password === '' ||
          adminToAdd.firstName === '' ||
          adminToAdd.lasl === '' ? (
            <Button variant='contained' disabled>
              Add
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                addAdmin({
                  email: adminToAdd.email,
                  firstName: adminToAdd.firstName,
                  lastName: adminToAdd.lastName,
                });
                register({
                  email: adminToAdd.email,
                  password: adminToAdd.password,
                  role: 'admin',
                });
                setNotification(
                  `Admin ${adminToAdd.firstName} ${adminToAdd.lastName} was added successfully!`
                );
                setShowInputFields(false);
                setAdminToAdd(null);
                setAddButtonDisabled(false)
              }}
            >
              Add
            </Button>
          )}

          <Button
            color='secondary'
            onClick={() => {
              setShowInputFields(false);
              setAddButtonDisabled(false);
              setAdminToAdd({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                role: 'admin',
              });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Dialog open={form.open}>
        {confirmationDialogue.open && (
          <ConfirmationDialogue
            func={handleDeleteAdmin}
            content={`This action is irreversable, are you sure that you wish to delete the admin ${adminToDelete.firstName}?`}
            isOpen={confirmationDialogue.open}
            close={handleConfirmationClose}
            successMsg={'Admin deleted successfully!'}
          />
        )}
        <form>
          <DialogTitle name='form-dialog-title'>All Admins</DialogTitle>
          <DialogContent>
            {admins.map((admin) => (
              <div key={admin._id}>
                <div
                  className={`${classes.sameLine} ${classes.titleActionSpace}`}
                >
                  <Typography className={classes.noMargin}>
                    {admin.firstName} {admin.lastName}
                  </Typography>
                  <div className={classes.sameLine}>
                    {currentAdmin.email === admin.email ||
                    admin.firstName === 'master' ? (
                      <Fab size='small' disabled className={classes.margin}>
                        <DeleteIcon />
                      </Fab>
                    ) : (
                      <Fab
                        size='small'
                        color='secondary'
                        aria-label='delete'
                        name={admin}
                        className={classes.margin}
                        onClick={() => {
                          setConfirmationDialogue({
                            ...confirmationDialogue,
                            open: true,
                          });
                          setAdminToDelete(admin);
                        }}
                      >
                        <DeleteIcon />
                      </Fab>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {showInputFields && renderAddAdminInputFields()}
            <Fab
              disabled={addButtonDisabled}
              size='small'
              color='primary'
              aria-label='delete'
              className={classes.margin}
              onClick={() => {
                setShowInputFields(true);
                setAddButtonDisabled(true);
              }}
            >
              <AddIcon />
            </Fab>
          </DialogContent>

          <DialogActions>
            <Button
              type='button'
              onClick={() => setForm({ open: false })}
              color='secondary'
            >
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
