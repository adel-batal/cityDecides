import React, { useState, useContext } from 'react';
import { useNotificationStyles } from '../../Hooks/StylesHook';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import NotificationContext from '../../Context/Notification/NotificationContext';

export default function Notifications() {
  const classes = useNotificationStyles();
  const [open, setOpen] = useState(false);
  const notificationContext = useContext(NotificationContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {notificationContext.notifications.length > 0 &&
        notificationContext.notifications.map((notification) => (
          <Snackbar
            key={notification.id}
            open={notification.display}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MuiAlert
              elevation={6}
              variant='filled'
              severity={notification.type}
              onClose={handleClose}
            >
              {notification.msg}
            </MuiAlert>
          </Snackbar>
        ))}
    </div>
  );
}
