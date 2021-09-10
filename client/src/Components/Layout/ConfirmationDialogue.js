import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import NotificationContext from '../../Context/Notification/NotificationContext';

export default function ConfirmationDialogue({
  successMsg,
  content,
  close,
  isOpen,
  func,
}) {
  const notificationContext = useContext(NotificationContext);
  const { setNotification } = notificationContext;
  const handleClose = (option) => {
    if (option === 'yes') {
      func();
      setNotification(successMsg, 'success', 7000)
    }
    close();
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are You Sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('no')} color='primary'>
            NO
          </Button>
          <Button onClick={() => handleClose('yes')} color='primary' autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
