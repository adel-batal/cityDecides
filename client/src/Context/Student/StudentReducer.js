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
  GET_STUDENTS,
  STUDENT_ERROR,
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload.student],
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
          (checkedStudent) => checkedStudent !== action.payload
        ),
      };
      case STUDENT_ERROR:
        return {
          ...state,
          error: action.payload
        };
    default:
      return state;
  }
};
