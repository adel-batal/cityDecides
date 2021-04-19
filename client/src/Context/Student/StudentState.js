import React, { useReducer } from 'react';
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
          { id: 2, unitName: 'Data Structures and Algorithms' },
          { id: 6, unitName: 'Object Oriented Programming' },
          { id: 3, unitName: 'Web Development' },
          { id: 4, unitName: 'Operating Systems' },
          { id: 1, unitName: 'Software Engineering' },
          { id: 5, unitName: 'Network Security' },
        ],
        creditCount: 60,
      },
    ],
    checkedStudents: [],
  };

  const [state, dispatch] = useReducer(StudentReducer, initialState);

  // add student
  const addStudent = (student) => {
    dispatch({ type: ADD_STUDENT, payload: student });
  };

  // delete student

  // set current student

  // clear current student

  // update student

  // filter students

  // clear filter

  // check student
  const checkStudent = (checkedStudent) => {
    dispatch({ type: CHECK_STUDENT, payload: checkedStudent });
  };

  const uncheckStudent = (uncheckedStudent) => {
    dispatch({ type: UNCHECK_STUDENT, payload: uncheckedStudent });
  };

  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        checkedStudents: state.checkedStudents,
        addStudent,
        checkStudent,
        uncheckStudent,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
