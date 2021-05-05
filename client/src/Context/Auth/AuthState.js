import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../Utils/setAuthToken';
import {
  REGISTER,
  REGISTER_SUCCESS,
  DELETE_USER,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
} from '../Types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // load user
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('http://localhost:5000/users/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/users/add',
        formData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
  // login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/users/login',
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error
      });
    }
  };
  // logout user
  const logout = () => dispatch({ type: LOGOUT });

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // delete user

  const deleteUser = async (userEmail) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.delete(
      `http://localhost:5000/users/${userEmail}`,
      config
    );
    dispatch({ type: DELETE_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.msg });
  }
};

// delete users
const deleteUsers = (users) => {
  users.forEach((user) => deleteUser(user.email));
};


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        login,
        loadUser,
        logout,
        deleteUsers
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
