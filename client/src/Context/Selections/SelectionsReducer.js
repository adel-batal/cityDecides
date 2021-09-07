import { UPDATE_SELECTIONS } from '../Types';

const SelectionsReducer =  (state, action) => {
  switch (action.type) {
    case UPDATE_SELECTIONS:
      return {
        ...state,
        tracks: action.payload.tracks,
        units: action.payload.units,
      };
    default:
      return state;
  }
};

export default SelectionsReducer;