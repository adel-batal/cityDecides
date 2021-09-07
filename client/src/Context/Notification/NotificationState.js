import React, { useReducer } from 'react';
import uuid from 'react-uuid';
import NotificationContext from './NotificationContext';
import NotificationReducer from './NotificationReducer';
import {
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../Types';

const NotificationState = (props) => {
  const initialState = []

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  // set notification
  const setNotification = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_NOTIFICATION,
      payload: { msg, type, id },
    });

    setTimeout(
      () => dispatch({ type: REMOVE_NOTIFICATION, payload: id }),
      timeout
    );
  };

  //remove notification
  const removeNotification = (id) => {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state,
        setNotification,
        removeNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
