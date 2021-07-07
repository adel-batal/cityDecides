import { UPDATE_SELECTIONS } from '../Types';

export default (state, action) => {
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
