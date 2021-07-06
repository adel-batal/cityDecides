import {
  GET_CAMPAIGNS,
  CAMPAIGN_ERROR,
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  UPDATE_CURRENT_CHOICES,
  SET_ACADEMIC_YEAR,
  CLEAR_ACADEMIC_YEAR,
  CLEAR_CURRENT_CAMPAIGN,
  SET_CURRENT_CAMPAIGN,
  GET_CURRENT_CAMPAIGN,
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case CREATE_CAMPAIGN:
      return {
        ...state,
        campaigns: [action.payload, ...state.campaigns],
      };
    case UPDATE_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          campaign._id === action.payload._id ? action.payload : campaign
        ),
      };
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case DELETE_CAMPAIGN:
      return {
        ...state,
        campaigns: state.campaigns.filter(
          (campaign) => campaign._id !== action.payload.campaign._id
        ),
      };
    case SET_ACADEMIC_YEAR:
      return {
        ...state,
        academicYear: action.payload,
      };
    case SET_CURRENT_CAMPAIGN:
    case GET_CURRENT_CAMPAIGN:
      return {
        ...state,
        currentCampaign: action.payload,
      };
    case CLEAR_CURRENT_CAMPAIGN:
      return {
        ...state,
        currentCampaign: null,
      };
    default:
      return state;
  }
};
