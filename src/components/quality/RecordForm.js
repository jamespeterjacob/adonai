import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRecord } from '../../actions';
import DatePicker from 'react-datepicker';

const RecordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: new Date(),
    accountName: '',
    opportunityName: '',
    auditType: '',
    userName: '',
    question1: 'No',
    question2: 'No',
    question3: 'No',
    question4: 'No',
    question5: 'No',
    question6: 'No',
    question7: 'No',
    question8: 'No',
    question9: 'No',
    question10: 'No',
    comments: '',
    totalPercentage: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Calculate the new totalPercentage when a question response changes
    if (name.startsWith('question')) {
      const totalYes = Object.values({ ...formData, [name]: value }).filter(
        (response) => response === 'Yes'
      ).length;
      const totalQuestions = 10; // Number of questions
      const totalPercentage = (totalYes / totalQuestions) * 100;
      setFormData({
        ...formData,
        [name]: value,
        totalPercentage,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date, 
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to add a new record
    dispatch(addRecord(formData));

    // Clear the form
    setFormData({
      date: new Date(),
      accountName: '',
      opportunityName: '',
      auditType: '',
      userName: '',
      question1: 'No',
      question2: 'No',
      question3: 'No',
      question4: 'No',
      question5: 'No',
      question6: 'No',
      question7: 'No',
      question8: 'No',
      question9: 'No',
      question10: 'No',
      comments: '',
      totalPercentage: 0,
    });

    // Return to RecordList view
    navigate('/recordlist');
  };


  

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  

  
  return (
    <div class="row main">
      <h2>Add New Record</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Date:</label>
          <DatePicker selected={formData.date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Account Name:</label>
          <input type="text" name="accountName" value={formData.accountName} onChange={handleChange} required/>
        </div>
        <div>
          <label>Opportunity Name:</label>
          <input
            type="text"
            name="opportunityName"
            value={formData.opportunityName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Audit Type:</label>
          <input
            type="text"
            name="auditType"
            value={formData.auditType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3>Quality Questions:</h3>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((questionNumber) => (
            <div key={questionNumber}>
              <label>{`Question ${questionNumber}:`}</label>
              <select
                name={`question${questionNumber}`}
                value={formData[`question${questionNumber}`]}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          ))}
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Percentage:</label>
          <input
            type="text"
            name="totalPercentage"
            value={`${formData.totalPercentage}%`}
            disabled
          />
        </div>


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecordForm;
