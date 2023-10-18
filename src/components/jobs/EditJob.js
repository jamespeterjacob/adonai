// EditJob.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const EditJob = () => {
  const { id } = useParams();
  //const history = useHistory();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/jobs/${id}`)
      .then((response) => setJob(response.data))
      .catch((error) => console.error('Error fetching job:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send a PUT request to update the job data
    axios
      .put(`http://localhost:8000/jobs/${id}`, job) // Adjust the API endpoint
      .then(() => {
        // After successful update, navigate back to the JobList page
        //history.push('/');
        navigate('/joblist');
      })
      .catch((error) => console.error('Error updating job:', error));
  };

  return (
    <div className='row main'>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditJob;