import React, { useReducer } from 'react';
import axios from 'axios';
import StudentContext from './StudentContext';
import StudentReducer from './StudentReducer';
import BASE_URL from '../BASE_URL';
import {
  GET_STUDENTS,
  GET_STUDENT,
  STUDENT_ERROR,
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  CHECK_STUDENT,
  UNCHECK_STUDENT,
  ADD_STUDENT_FAIL,
  CLEAR_STUDENTS,
  SUBMIT_SELECTIONS,
} from '../Types';

const StudentState = (props) => {
  const initialState = {
    students: [],
    checkedStudents: [],
    current: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(StudentReducer, initialState);

  //get students

  const getStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/students`);

      dispatch({
        type: GET_STUDENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_ERROR,
        payload: err.response,
      });
    }
  };
  const getStudent = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/students/${id}`);

      dispatch({
        type: GET_STUDENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: STUDENT_ERROR,
        payload: err.response,
      });
    }
  };

  // add student

  const addStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/students/add`,
        student,
        config
      );
      dispatch({ type: ADD_STUDENT, payload: res.data });
    } catch (error) {
      dispatch({ type: ADD_STUDENT_FAIL, payload: error });
    }
  };

  // update student
  const updateStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(
        `${BASE_URL}/students/${student.id}`,
        student,
        config
      );
      dispatch({ type: UPDATE_STUDENT, payload: res.data });
    } catch (error) {
      dispatch({ type: STUDENT_ERROR, payload: error.msg });
    }
  };

  // delete student
  const deleteStudent = async (student) => {
    try {
      const res = await axios.delete(`${BASE_URL}/students/${student.id}`);
      dispatch({
        type: DELETE_STUDENT,
        payload: { result: res.data, studentId: student.id },
      });
    } catch (error) {
      dispatch({ type: STUDENT_ERROR, payload: error.msg });
    }
  };
  // delete students
  const deleteStudents = (students) => {
    students.forEach((student) => deleteStudent(student));
  };

  // set current student
  const setCurrentStudent = (student) => {
    dispatch({ type: SET_CURRENT, payload: student });
  };

  // clear current student
  const clearCurrentStudent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };


  //uncheck student
  const uncheckStudent = (idEmail) => {
    dispatch({ type: UNCHECK_STUDENT, payload: idEmail });
  };

  // check student;
  const checkStudent = (idEmail) => {
    dispatch({ type: CHECK_STUDENT, payload: idEmail });
  };

  const clearCheckedStudnts = () => {
    state.checkedStudents.forEach((student) => uncheckStudent(student));
  };

  //clear students
  const clearStudents = () => {
    dispatch({ type: CLEAR_STUDENTS });
  };

  const submitSelections = async (email, selectedTracks, selectedUnits) => {
    const selections = { selectedTracks, selectedUnits };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(
        `${BASE_URL}/students/submitSelections/${email}`,
        selections,
        config
      );
      dispatch({ type: SUBMIT_SELECTIONS, payload: res.data });
    } catch (error) {
      dispatch({ type: STUDENT_ERROR, payload: error.response.msg });
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        checkedStudents: state.checkedStudents,
        currentStudent: state.current,
        addStudent,
        getStudent,
        checkStudent,
        uncheckStudent,
        clearStudents,
        getStudents,
        setCurrentStudent,
        clearCurrentStudent,
        updateStudent,
        deleteStudents,
        clearCheckedStudnts,
        submitSelections,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
