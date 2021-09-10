import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../Utils/setAuthToken';
import BASE_URL from '../BASE_URL';

import {
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
    user: JSON.parse(localStorage.getItem('user')),
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // load user
  const loadUser = async () => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get(`${BASE_URL}/users/auth${state.user.role}`);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
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
      const res = await axios.post(`${BASE_URL}/users/add`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.result,
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
      const res = await axios.post(`${BASE_URL}/users/login`, formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      setAuthToken(localStorage.token);
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };
  // logout user
  const logout = () => dispatch({ type: LOGOUT });

  // clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // delete user

  const deleteUser = async (email) => {
    try {
      const res = await axios.delete(`${BASE_URL}/users/${email}`);
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
        logout,
        deleteUser,
        deleteUsers,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
