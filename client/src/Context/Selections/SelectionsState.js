import React, { useReducer } from 'react';
import SelectionsContext from './SelectionsContext';
import SelectionsReducer from './SelectionsReducer';
import {UPDATE_SELECTIONS} from '../Types';

const SelectionsState = (props) => {
  const initialState = {
    tracks: [],
    units: [],
  };

  const [state, dispatch] = useReducer(SelectionsReducer, initialState);

  //setSelections
  const setSelections = (selections) => {
    dispatch({ type: UPDATE_SELECTIONS, payload: selections });
  };

  return (
    <SelectionsContext.Provider
      value={{
        tracks: state.tracks,
        units: state.units,
        setSelections,
      }}
    >
      {props.children}
    </SelectionsContext.Provider>
  );
};

export default SelectionsState;
