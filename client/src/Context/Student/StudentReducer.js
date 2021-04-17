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

export default (state, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
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
    default:
      return state;
  }
};
