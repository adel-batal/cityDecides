import React, { useReducer } from 'react';
import axios from 'axios';
import StudentContext from './StudentContext';
import StudentReducer from './StudentReducer';
import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STUDENT,
  FILTER_STUDENTS,
  CLEAR_FILTER,
  CHECK_STUDENT,
  UNCHECK_STUDENT,
  ADD_STUDENT_FAIL
} from '../Types';

const StudentState = (props) => {
  const initialState = {
    students: [
      {
        email: 'adel@gmail.com',
        firstName: 'Adel',
        lastName: 'Batal',
        regNumber: '1',
        password: '123',
        selectedTracks: [
          'business infromatics',
          'general',
          'internet computing',
        ],
        selectedUnits: ['mobile computing', 'e-commerce', 'operating systems'],
        creditCount: 30,
      },
      {
        email: 'john@gmail.com',
        firstName: 'john',
        lastName: 'Doe',
        regNumber: '2',
        password: '123',
        selectedTracks: [
          'general',
          'internet computing',
          'business infromatics',
        ],
        selectedUnits: ['operating systems', 'mobile computing', 'e-commerce'],
        creditCount: 70,
      },
      {
        email: 'jane@gmail.com',
        firstName: 'jane',
        lastName: 'Smith',
        regNumber: '3',
        password: '123',
        selectedTracks: [
          'internet computing',
          'general',
          'business infromatics',
        ],
        selectedUnits: ['e-commerce', 'operating systems', 'mobile computing'],
        creditCount: 100,
      },
    ],
    checkedStudents: []
  };

  const [state, dispatch] = useReducer(StudentReducer, initialState);

  // add student
  const addStudent = async student => {
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
      dispatch({type: ADD_STUDENT, payload: {student, res}})
    } catch (error) {
    
    }
  }

  // delete student

  // set current student

  // clear current student

  // update student

  // filter students

  // clear filter

  // check student
  const checkStudent = checkedStudentEmail => {
    dispatch({type: CHECK_STUDENT, payload: checkedStudentEmail})
  }

  const uncheckStudent = uncheckedStudentEmail => {
    dispatch({type: UNCHECK_STUDENT, payload: uncheckedStudentEmail})
  }

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        checkedStudents: state.checkedStudents,
        addStudent,
        checkStudent,
        uncheckStudent
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
