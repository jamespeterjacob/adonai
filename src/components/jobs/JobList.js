// src/components/JobList.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJobs, deleteJob } from '../../actions/jobActions';
import EditJob from './EditJob'; 
import JobForm from './JobForm';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const JobList = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const [editJobId, setEditJobId] = useState(null);
  const [isAddingJob, setIsAddingJob] = useState(false); // State to control RecordForm visibility

  useEffect(() => {
    // Fetch jobs when the component mounts
    dispatch(fetchJobs());
  }, [dispatch]);


  // const handleDelete = (id) => {
  //   // Dispatch the deleteJob action to delete the job by ID
  //   if (window.confirm('Are you sure you want to delete this job?')) {
  //     dispatch(deleteJob(id));
  //   }
  // };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
          dispatch(deleteJob(id));
        }
  };

  const handleEditComplete = () => {
    setEditJobId(null); // Set editRecordId to null to exit edit mode
  };

  const handleAddJobClick = () => {
    setIsAddingJob(true); // Show the RecordForm component
  };

  const handleEditClick = (id) => {
    setEditJobId(id);
  };

  return (
//     <div className='row main'>
//       <h2>Jobs</h2>
//       {/* <Link to="/jobs/add">Add Job</Link> */}
//       <button style={{ marginBottom: '10px' }}>
//         <Link to="/add-job" style={{ textDecoration: 'none', color: 'black' }}>
//           Add Job
//         </Link>
//       </button>
//       <ul>WHERE AM I
//         {jobs.map((job) => (
//           <li key={job.id} style={{listStyle:"none"}}>
//             <Link to={`/jobs/edit/${job.id}`}>{job.title}</Link>
//             <button onClick={() => handleDelete(job.id)}>Delete</button>
//           </li>
//         ))}

// {editJobId === job.id ? (
//                   <EditJob job={job} onComplete={handleEditComplete} />
//                 ) : (
//                   <>
//                     <button onClick={() => handleEditClick(job.id)}>Edit</button>
//                     <button onClick={() => handleDeleteClick(job.id)}>Delete</button>
//                   </>
//                 )}
//       </ul>
//     </div>
<div class="myTable main">
<h2>Jobs</h2>
{/* <button onClick={handleAddRecordClick}>Add Record</button> Add Record button */}
{/* <Link to="/add-record">Add Record</Link> */}
<Button variant="contained" style={{ marginBottom: '10px' }}>
  <Link to="/add-job" style={{ textDecoration: 'none', color: 'white' }}>
    Add Job
  </Link>
</Button>


<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow style={{backgroundColor:'lightgray'}}>
      <TableCell>Job Title</TableCell>
      <TableCell align="left">job Description</TableCell>
      <TableCell align="left">Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {jobs.map((job) => (
      <TableRow key={job.id}>
        <TableCell>{job.title}</TableCell>
        <TableCell>{job.description}</TableCell>
        <TableCell>
          {editJobId === job.id ? (
            // <EditJob job={job} onComplete={handleEditComplete} />
            // <EditJob to="/edit-job" style={{ textDecoration: 'none', color: 'black' }}></EditJob>
            <Link to={`/edit-job/${job.id}`}>Edit</Link>
          ) : (
            <>
              <Button variant="outlined" onClick={() => handleEditClick(job.id)}><Link to={`/edit-job/${job.id}`}>Edit</Link></Button>
              <Button variant="outlined" onClick={() => handleDeleteClick(job.id)}>Delete</Button>
            </>
          )}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
{isAddingJob && <JobForm />} 

</TableContainer>
</div>

  );
};

export default JobList;
