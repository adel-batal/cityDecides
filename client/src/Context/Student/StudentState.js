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
} from '../Types';

const StudentState = (props) => {
  const initialState = {
    students: [
      /* {
        email: 'adel@gmail.com',
        firstName: 'Adel',
        lastName: 'Batal',
        regNumber: '1',
        password: '123',
        selectedTracks: [
          { id: 3, trackName: 'business infromatics' },
          { id: 1, trackName: 'general' },
          { id: 2, trackName: 'internet computing' },
        ],
        selectedUnits: [
          { id: 1, unitName: 'Software Engineering' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 3, unitName: 'Web Development' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 5, unitName: 'Network Security' },
          { id: 6, unitName: 'Object Oriented Programming' },
        ],
        creditCount: 120,
      },
      {
        email: 'john@gmail.com',
        firstName: 'john',
        lastName: 'Doe',
        regNumber: '2',
        password: '123',
        selectedTracks: [
          { id: 1, trackName: 'general' },
          { id: 2, trackName: 'internet computing' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
        ],
        creditCount: 100,
      },
      {
        email: 'jane@gmail.com',
        firstName: 'jane',
        lastName: 'Smith',
        regNumber: '3',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 110,
      },
      {
        email: 'sam@gmail.com',
        firstName: 'Sam',
        lastName: 'Smith',
        regNumber: '4',
        password: '123',
        selectedTracks: [
          { id: 3, trackName: 'business infromatics' },
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
        ],
        selectedUnits: [
          { id: 1, unitName: 'Software Engineering' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
        ],
        creditCount: 100,
      },
      {
        email: 'becca@gmail.com',
        firstName: 'Becca',
        lastName: 'White',
        regNumber: '5',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 3, trackName: 'business infromatics' },
          { id: 1, trackName: 'general' },
        ],
        selectedUnits: [
          { id: 4, unitName: 'Operating Systems' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 120,
      },
      {
        email: 'christian@gmail.com',
        firstName: 'Christian',
        lastName: 'Jackson',
        regNumber: '6',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 3, unitName: 'Web Development' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 5, unitName: 'Network Security' },
          { id: 4, unitName: 'Operating Systems' },
        ],
        creditCount: 110,
      },
      {
        email: 'ahmad@gmail.com',
        firstName: 'Ahmad',
        lastName: 'Sabbagh',
        regNumber: '7',
        password: '123',
        selectedTracks: [
          { id: 1, trackName: 'general' },
          { id: 2, trackName: 'internet computing' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 100,
      },
      {
        email: 'mixalis@gmail.com',
        firstName: 'Michalis',
        lastName: 'Dimitriou',
        regNumber: '8',
        password: '123',
        selectedTracks: [
          { id: 3, trackName: 'business infromatics' },
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
        ],
        selectedUnits: [
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 3, unitName: 'Web Development' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 4, unitName: 'Operating Systems' },
        ],
        creditCount: 70,
      },
      {
        email: 'alex@gmail.com',
        firstName: 'Alex',
        lastName: 'Green',
        regNumber: '9',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 1, unitName: 'Software Engineering' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 5, unitName: 'Network Security' },
          { id: 3, unitName: 'Web Development' },
        ],
        creditCount: 90,
      },
      {
        email: 'thanos@gmail.com',
        firstName: 'Thanos',
        lastName: 'Mak',
        regNumber: '10',
        password: '123',
        selectedTracks: [
          { id: 3, trackName: 'business infromatics' },
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
        ],
        selectedUnits: [
          { id: 4, unitName: 'Operating Systems' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 3, unitName: 'Web Development' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 80,
      },
      {
        email: 'Jack@gmail.com',
        firstName: 'Jack',
        lastName: 'Johnes',
        regNumber: '11',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 3, unitName: 'Web Development' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
        ],
        creditCount: 80,
      },
      {
        email: 'Micky@gmail.com',
        firstName: 'Micky',
        lastName: 'Mouse',
        regNumber: '12',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 4, unitName: 'Operating Systems' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 70,
      },
      {
        email: 'John@gmail.com',
        firstName: 'John',
        lastName: 'Snow',
        regNumber: '13',
        password: '123',
        selectedTracks: [
          { id: 3, trackName: 'business infromatics' },
          { id: 1, trackName: 'general' },
          { id: 2, trackName: 'internet computing' },
        ],
        selectedUnits: [
          { id: 3, unitName: 'Web Development' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 5, unitName: 'Network Security' },
          { id: 4, unitName: 'Operating Systems' },
        ],
        creditCount: 80,
      },
      {
        email: 'Jesse@gmail.com',
        firstName: 'Jesse',
        lastName: 'Pinkman',
        regNumber: '14',
        password: '123',
        selectedTracks: [
          { id: 1, trackName: 'general' },
          { id: 2, trackName: 'internet computing' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 3, unitName: 'Web Development' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 5, unitName: 'Network Security' },
        ],
        creditCount: 20,
      },
      {
        email: 'kevin@gmail.com',
        firstName: 'Kevin',
        lastName: 'Hart',
        regNumber: '15',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 1, unitName: 'Software Engineering' },
          { id: 3, unitName: 'Web Development' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 5, unitName: 'Network Security' },
          { id: 6, unitName: 'Object Oriented Programming' },
        ],
        creditCount: 30,
      },
      {
        email: 'stanley@gmail.com',
        firstName: 'Stanley',
        lastName: 'Lincoln',
        regNumber: '16',
        password: '123',
        selectedTracks: [
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
          { id: 2, trackName: 'internet computing' },
        ],
        selectedUnits: [
          { id: 4, unitName: 'Operating Systems' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 5, unitName: 'Network Security' },
          { id: 3, unitName: 'Web Development' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 40,
      },
      {
        email: 'teddy@gmail.com',
        firstName: 'Teddy',
        lastName: 'Johnson',
        regNumber: '17',
        password: '123',
        selectedTracks: [
          { id: 1, trackName: 'general' },
          { id: 2, trackName: 'internet computing' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 3, unitName: 'Web Development' },
          { id: 5, unitName: 'Network Security' },
          { id: 1, unitName: 'Software Engineering' },
        ],
        creditCount: 50,
      },
      {
        email: 'Mary@gmail.com',
        firstName: 'Mary',
        lastName: 'Mcgill',
        regNumber: '19',
        password: '123',
        selectedTracks: [
          { id: 2, trackName: 'internet computing' },
          { id: 1, trackName: 'general' },
          { id: 3, trackName: 'business infromatics' },
        ],
        selectedUnits: [
          { id: 2, unitName: "Data Structures and Algorithms" },
          { id: 6, unitName: "Object Oriented Programming" },
          { id: 3, unitName: "Web Development" },
          { id: 4, unitName: "Operating Systems" },
          { id: 1, unitName: "Software Engineering" },
          { id: 5, unitName: "Network Security" },
        ],
        creditCount: 60,
      },
    */
    ],
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
      dispatch({ type: ADD_STUDENT, payload: { student, res } });
    } catch (error) {}
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

  // add students

  const addStudents = (students) => {
    students.forEach((student) => addStudent(student));
  };

  // delete student

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

  // check student;

  //uncheck student
  const uncheckStudent = (student) => {
    dispatch({ type: UNCHECK_STUDENT, payload: student });
  };

  //set checked student
  const checkStudent = (student) => {
    dispatch({ type: CHECK_STUDENT, payload: student });
  };

  //clear students
  const clearStudents = () => {
    dispatch({ type: CLEAR_STUDENTS });
  };

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        checkedStudents: state.checkedStudents,
        currentStudent: state.current,
        addStudent,
        addStudents,
        checkStudent,
        uncheckStudent,
        clearStudents,
        getStudents,
        setCurrentStudent,
        clearCurrentStudent,
        updateStudent,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
