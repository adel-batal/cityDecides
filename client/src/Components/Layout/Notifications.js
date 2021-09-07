import React, { useContext } from 'react';
import { useNotificationStyles } from '../../Hooks/StylesHook';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import NotificationContext from '../../Context/Notification/NotificationContext';

export default function Notifications() {
  const classes = useNotificationStyles();
  const notificationContext = useContext(NotificationContext);
  const { removeNotification, notifications } = notificationContext;
  const handleClose = (id) => {
    removeNotification(id);
  };
  return (
    <div className={classes.root}>
      {notifications.length > 0 &&
        notifications.map(({ id, type, msg }) => (
          <Snackbar key={id} open={true} autoHideDuration={6000}>
            <MuiAlert
              elevation={6}
              variant='filled'
              severity={type}
              onClose={() => handleClose(id)}
            >
              {msg}
            </MuiAlert>
          </Snackbar>
        ))}
    </div>
  );
}
