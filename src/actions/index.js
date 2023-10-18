import axios from 'axios';

export const FETCH_RECORDS = 'FETCH_RECORDS';
export const ADD_RECORD = 'ADD_RECORD';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const DELETE_RECORD = 'DELETE_RECORD';

const apiUrl = 'http://localhost:8000/records';

// export const fetchRecords = () => async (dispatch) => {
//   const response = await axios.get(apiUrl);
//   dispatch({ type: FETCH_RECORDS, payload: response.data });
// };

export const fetchRecords = () => async (dispatch) => {
  const response = await axios.get(apiUrl);
  dispatch({ type: FETCH_RECORDS, payload: response.data });
};

export const addRecord = (record) => async (dispatch) => {
  const response = await axios.post(apiUrl, record);
  dispatch({ type: ADD_RECORD, payload: response.data });
};

// Action creators
// export const updateRecord = (id, updatedData) => async (dispatch) => {
//   const response = await axios.put(`${apiUrl}/${id}`, updatedData);
//   dispatch({ type: UPDATE_RECORD, payload: response.data });
// };

export const updateRecord = (id, updatedData) => async (dispatch, getState) => {
  try {
    // Send the PUT request to update the record on the server
    const response = await axios.put(`${apiUrl}/${id}`, updatedData);

    // Calculate the totalPercentage value based on updatedData or fetch it from the response if your server updates it
    const totalYes = Object.values(updatedData).filter((response) => response === 'Yes').length;
    const totalQuestions = 10; // Number of questions
    const totalPercentage = (totalYes / totalQuestions) * 100;

    // Merge the updated totalPercentage value into updatedData
    updatedData.totalPercentage = totalPercentage;

    // Dispatch the action to update the Redux store with the response data
    dispatch({ type: UPDATE_RECORD, payload: updatedData });
  } catch (error) {
    // Handle any errors, e.g., network errors or server errors
    console.error('Error updating record:', error);
  }
};


export const deleteRecord = (id) => async (dispatch) => {
  await axios.delete(`${apiUrl}/${id}`);
  dispatch({ type: DELETE_RECORD, payload: id });
};

