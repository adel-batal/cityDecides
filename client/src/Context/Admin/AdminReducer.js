import {
  ADD_ADMIN,
  DELETE_ADMIN,
  UPDATE_ADMIN,
  GET_ADMINS,
  ADMIN_ERROR,
  SET_CURRENT_ADMIN,
} from '../Types';

const AdminReducer = (state, action) => {
  switch (action.type) {
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
        loading: false,
      };
    case ADD_ADMIN:
      return {
        ...state,
        admins: [action.payload, ...state.admins],
        loading: false,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        ),
      };
    case DELETE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter(
          (admin) => admin._id !== action.payload.adminId
        ),
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };

    default:
      return state;
  }
};

export default AdminReducer;
