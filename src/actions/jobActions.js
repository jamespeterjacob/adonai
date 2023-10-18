// src/actions/jobActions.js
import axios from 'axios';

export const FETCH_JOBS = 'FETCH_JOBS';
export const CREATE_JOB = 'CREATE_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';

const apiUrl = 'http://localhost:8000/jobs';

export const fetchJobs = () => async (dispatch) => {
  const response = await axios.get(apiUrl);
  dispatch({ type: FETCH_JOBS, payload: response.data });
};

export const createJob = (job) => async (dispatch) => {
  const response = await axios.post(apiUrl, job);
  dispatch({ type: CREATE_JOB, payload: response.data });
};

// Action creators
// export const updateRecord = (id, updatedData) => async (dispatch) => {
//   const response = await axios.put(`${apiUrl}/${id}`, updatedData);
//   dispatch({ type: UPDATE_RECORD, payload: response.data });
// };

export const updateJob = (id, updatedData) => async (dispatch, getState) => {
  try {
    // Send the PUT request to update the record on the server
    const response = await axios.put(`${apiUrl}/${id}`);

    // Calculate the totalPercentage value based on updatedData or fetch it from the response if your server updates it
    // const totalYes = Object.values(updatedData).filter((response) => response === 'Yes').length;
    // const totalQuestions = 10; // Number of questions
    // const totalPercentage = (totalYes / totalQuestions) * 100;

    // Merge the updated totalPercentage value into updatedData
    //updatedData.totalPercentage = totalPercentage;

    // Dispatch the action to update the Redux store with the response data
    dispatch({ type: UPDATE_JOB, payload: updatedData });
  } catch (error) {
    // Handle any errors, e.g., network errors or server errors
    console.error('Error updating job:', error);
  }
};


export const deleteJob = (id) => async (dispatch) => {
  await axios.delete(`${apiUrl}/${id}`);
  dispatch({ type: DELETE_JOB, payload: id });
};

