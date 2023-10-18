import { combineReducers } from 'redux';
import { FETCH_RECORDS, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../actions'; // Import the missing action types
import { FETCH_JOBS, CREATE_JOB, UPDATE_JOB, DELETE_JOB } from '../actions/jobActions';
// import jobReducer from './jobReducer'; // Add this line
// import applicantReducer from './applicantReducer';


const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECORDS:
      return action.payload;
    case ADD_RECORD:
      return [...state, action.payload];
    case UPDATE_RECORD:
        return state.map((record) =>
          record.id === action.payload.id ? action.payload : record
        );
    case DELETE_RECORD:
        return state.filter((record) => record.id !== action.payload);
      default:
        return state;
  }
};

// const initialState = {
//   jobs: [],
// };

const jobsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    case CREATE_JOB:
      return [...state, action.payload];
    case UPDATE_JOB:
        return state.map((job) =>
          job.id === action.payload.id ? action.payload : job
        );
    case DELETE_JOB:
        return state.filter((job) => job.id !== action.payload);
      default:
        return state;
  }
};


const rootReducer = combineReducers({
  records: recordsReducer,
  //applicants: applicantReducer,
  jobs: jobsReducer, // Add this line
});

export default rootReducer;
