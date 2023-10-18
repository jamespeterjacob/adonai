import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecord = () => {
  const { id } = useParams();
  //const history = useHistory();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountName: '',
    opportunityName: '',
    auditType: '',
    userName: '',
    // Add other fields here
  });

  useEffect(() => {
    // Fetch the record data using Axios
    axios.get(`http://localhost:8000/records/${id}`) // Replace with your actual API endpoint
      .then((response) => {
        const recordData = response.data;
        setFormData({
          accountName: recordData.accountName,
          opportunityName: recordData.opportunityName,
          auditType: recordData.auditType,
          userName: recordData.userName,
          // Set other fields here
        });
      })
      .catch((error) => {
        console.error('Error fetching record data:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateRecord = (e) => {
    e.preventDefault();
    // Send a POST request to update the record using Axios
    axios.put(`http://localhost:8000/records/${id}`, formData) // Replace with your actual API endpoint
      .then(() => {
        //history.push('/');
         // Redirect back to the list view after updating
         navigate('/recordlist');
      })
      .catch((error) => {
        console.error('Error updating record:', error);
      });
  };

  return (
    <div className='row main'>
      <h2>Edit Record</h2>
      <form onSubmit={handleUpdateRecord}>
        <label>Account Name:</label>
        <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} />

        <label>Opportunity Name:</label>
        <input type="text" name="opportunityName" value={formData.opportunityName} onChange={handleInputChange} />

        <label>Audit Type:</label>
        <input type="text" name="auditType" value={formData.auditType} onChange={handleInputChange} />

        <label>User Name:</label>
        <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />

        {/* Add other fields as needed */}

        <button type="submit" >Update Record</button>
      </form>
    </div>
  );
};

export default EditRecord;