import React, { useReducer } from 'react';
import axios from 'axios';
import AdminContext from './AdminContext';
import AdminReducer from './AdminReducer';
import BASE_URL from '../BASE_URL';
import {
  GET_ADMINS,
  ADMIN_ERROR,
  ADD_ADMIN,
  DELETE_ADMIN,
  UPDATE_ADMIN,
  SET_CURRENT_ADMIN,
} from '../Types';

const AdminState = (props) => {
  const initialState = {
    admins: [],
    currentAdmin: null,
  };

  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const getAdmins = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admins`);

      dispatch({
        type: GET_ADMINS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response,
      });
    }
  };
  const addAdmin = async (admin) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}admins/add`,
        admin,
        config
      );
      dispatch({ type: ADD_ADMIN, payload: res.data });
    } catch (error) {
      dispatch({ type: ADMIN_ERROR, payload: error });
    }
  };
  const updateAdmin = async (admin) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(
        `${BASE_URL}/admins/${admin.id}`,
        admin,
        config
      );
      dispatch({ type: UPDATE_ADMIN, payload: res.data });
    } catch (error) {
      dispatch({ type: ADMIN_ERROR, payload: error.msg });
    }
  };
  const deleteAdmin = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${BASE_URL}/admins/${id}`);
      dispatch({
        type: DELETE_ADMIN,
        payload: { result: res.data, adminId: id },
      });
    } catch (error) {
      dispatch({ type: ADMIN_ERROR, payload: error.msg });
    }
  };
  const setCurrentAdmin = (admin) => {
    dispatch({ type: SET_CURRENT_ADMIN, payload: admin });
  };

  return (
    <AdminContext.Provider
      value={{
        admins: state.admins,
        currentAdmin: state.currentAdmin,
        getAdmins,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        setCurrentAdmin,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
