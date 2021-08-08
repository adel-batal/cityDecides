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
  SET_CHECKED_STUDENT,
  CLEAR_STUDENTS,
  GET_STUDENTS,
  STUDENT_ERROR,
  UPDATE_OWN_SELECTIONS,
  SUBMIT_SELECTIONS,
  ADD_STUDENT_FAIL
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
        loading: false,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload.student._id
        ),
      };
    case CHECK_STUDENT:
      return {
        ...state,
        checkedStudents: [...state.checkedStudents, action.payload],
      };
    case UNCHECK_STUDENT:
      return {
        ...state,
        checkedStudents: state.checkedStudents.filter(
          (checkedStudent) => checkedStudent._id !== action.payload._id
        ),
      };
    case CLEAR_STUDENTS:
      return {
        ...state,
        students: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case ADD_STUDENT_FAIL:
    case STUDENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SUBMIT_SELECTIONS:
      return {
        ...state,
        students: state.students.map(student => (
          student.email !== action.payload ? student :
          action.payload
        ))
      };

    default:
      return state;
  }
};
