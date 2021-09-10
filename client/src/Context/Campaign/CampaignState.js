import React, { useReducer } from 'react';
import axios from 'axios';
import CampaignContext from './CampaignContext';
import CampaignReducer from './CampaignReducer';
import BASE_URL from '../BASE_URL';

import {
  GET_CAMPAIGNS,
  CAMPAIGN_ERROR,
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  SET_ACADEMIC_YEAR,
  SET_CURRENT_CAMPAIGN,
  CLEAR_CURRENT_CAMPAIGN,
  GET_CURRENT_CAMPAIGN,
  UPDATE_CAMPAIGN,
} from '../Types';

const CampaignState = (props) => {
  const initialState = {
    campaigns: [],
    academicYear: '',
    currentCampaign: '',
  };

  const [state, dispatch] = useReducer(CampaignReducer, initialState);

  //get campaigns

  const getCampaigns = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/campaigns`);

      dispatch({
        type: GET_CAMPAIGNS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CAMPAIGN_ERROR,
        payload: err.response,
      });
    }
  };

  //create campaign
  const createCampaign = async (campaign) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${BASE_URL}/campaigns/add`,
        campaign,
        config
      );
      dispatch({ type: CREATE_CAMPAIGN, payload: res.data });
      console.log(res.data);
    } catch (error) {}
  };
  //delete campaign
  const deleteCampaign = async (campaign) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.delete(
        `${BASE_URL}/campaigns/${campaign._id}`,

        config
      );
      dispatch({
        type: DELETE_CAMPAIGN,
        payload: { data: res.data, campaign: campaign },
      });
    } catch (error) {}
  };

  const setAcademicYear = (ay) => {
    dispatch({ type: SET_ACADEMIC_YEAR, payload: ay });
  };

  const setCurrentCampaign = (campaign) => {
    dispatch({ type: SET_CURRENT_CAMPAIGN, payload: campaign });
  };

  const getCurrentCampaign = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/campaigns/currentCampaign`);

      dispatch({ type: GET_CURRENT_CAMPAIGN, payload: res.data });
    } catch (err) {
      dispatch({
        type: CAMPAIGN_ERROR,
        payload: err.response,
      });
    }
  };

  const clearCurrentCampaign = () => {
    dispatch({ type: CLEAR_CURRENT_CAMPAIGN });
  };

  const updateCampaign = async (campaign) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(
        `${BASE_URL}/students/${campaign._id}`,
        campaign,
        config
      );
      dispatch({ type: UPDATE_CAMPAIGN, payload: res.data });
    } catch (error) {
      dispatch({ type: CAMPAIGN_ERROR, payload: error.msg });
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns: state.campaigns,
        academicYear: state.academicYear,
        currentCampaign: state.currentCampaign,
        getCampaigns,
        createCampaign,
        deleteCampaign,
        setAcademicYear,
        setCurrentCampaign,
        clearCurrentCampaign,
        getCurrentCampaign,
        updateCampaign,
      }}
    >
      {props.children}
    </CampaignContext.Provider>
  );
};

export default CampaignState;
