// src/components/JobForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob } from '../../actions/jobActions';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const JobForm = () => {
    
  const [job, setJob] = useState({
    title: '',
    description: '',
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(job));
    setJob({
      title: '',
      description: '',
    });
    navigate('/joblist');
  };

  return (
    
      <Box className='row main' style={{alignContent:'center', alignItems:'center'}}
      component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
      noValidate autoComplete="off">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div className='container'>
        <TextField 
          type="text"
          name="title"
          placeholder="Title"
          value={job.title}
          onChange={handleInputChange}
        />
        </div>
        <div className='container'>
        <TextField
          name="description"
          placeholder="Description"
          value={job.description}
          onChange={handleInputChange}
        />
        </div>
        <div className='container' >
        <Button variant="contained" type="submit">Submit</Button>
        </div>
        
      </form>
      </Box>
    
  );
};

export default JobForm;
