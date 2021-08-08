import React, { useReducer } from 'react';
import axios from 'axios';
import StudentContext from './StudentContext';
import StudentReducer from './StudentReducer';
import {
  GET_STUDENTS,
  GET_STUDENT,
  STUDENT_ERROR,
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  CLEAR_FILTER,
  CHECK_STUDENT,
  SET_CHECKED_STUDENT,
  UNCHECK_STUDENT,
  ADD_STUDENT_FAIL,
  CLEAR_STUDENTS,
  UPDATE_OWN_SELECTIONS,
  SUBMIT_SELECTIONS
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
      const res = await axios.get('http://localhost:5000/students');

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

  // add student

  const addStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/students/add',
        student,
        config
      );
      dispatch({ type: ADD_STUDENT, payload: res.data  });
      
    } catch (error) {
      dispatch({ type: ADD_STUDENT_FAIL, payload: error  });
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
        `http://localhost:5000/students/${student._id}`,
        student,
        config
      );
      dispatch({ type: UPDATE_STUDENT, payload: res.data });
    } catch (error) {
      dispatch({ type: STUDENT_ERROR, payload: error.response.msg });
    }
  };

  // delete student
  const deleteStudent = async (student) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.delete(
        `http://localhost:5000/students/${student._id}`,
        student,
        config
      );
      dispatch({ type: DELETE_STUDENT, payload: {result: res.data, student: student} });
    } catch (error) {
      dispatch({ type: STUDENT_ERROR, payload: error.response.msg });
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

  // filter students

  // clear filter



  //uncheck student
  const uncheckStudent = (student) => {
    dispatch({ type: UNCHECK_STUDENT, payload: student });
  };

  // check student;
  const checkStudent = (student) => {
    dispatch({ type: CHECK_STUDENT, payload: student });
  };

  const clearCheckedStudnts = () => {
    state.checkedStudents.forEach((student) => uncheckStudent(student));
  };

  //clear students
  const clearStudents = () => {
    dispatch({ type: CLEAR_STUDENTS });
  };

  const submitSelections = async (email, selectedTracks, selectedUnits) => {
    const selections = {selectedTracks, selectedUnits}
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:5000/students/submitSelections/${email}`,
        selections,
        config
      );
      dispatch({ type: SUBMIT_SELECTIONS, payload: res.data });
    } catch (error) {
      dispatch({ type: STUDENT_ERROR, payload: error.response.msg });
    }
  }


  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        checkedStudents: state.checkedStudents,
        currentStudent: state.current,
        addStudent,
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
