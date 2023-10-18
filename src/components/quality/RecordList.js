import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditRecord from './EditRecord'; // Import the EditRecord component
import { deleteRecord, addRecord } from '../../actions';
import RecordForm from './RecordForm';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const RecordList = () => {
  // const records = useSelector((state) => state.records);
  // const [editRecordId, setEditRecordId] = useState(null);
  // const dispatch = useDispatch();
  const records = useSelector((state) => state.records);
  const [editRecordId, setEditRecordId] = useState(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false); // State to control RecordForm visibility
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    accountName: '',
    opportunityName: '',
    auditType: '',
    userName: '',
    startDate: '',
    endDate: '',
  });

  const [uniqueAccountNames, setUniqueAccountNames] = useState([]);
  const [uniqueOpportunityNames, setUniqueOpportunityNames] = useState([]);
  const [uniqueAuditTypes, setUniqueAuditTypes] = useState([]);
  const [uniqueUserNames, setUniqueUserNames] = useState([]);

  useEffect(() => {
    // Retrieve unique account names from records
    const uniqueNames = [...new Set(records.map((record) => record.accountName))];
    const uniqueOpportunities = [...new Set(records.map((record) => record.opportunityName))];
    const uniqueTypes = [...new Set(records.map((record) => record.auditType))];
    const uniqueUsers = [...new Set(records.map((record) => record.userName))];

    setUniqueAccountNames(uniqueNames);
    setUniqueOpportunityNames(uniqueOpportunities);
    setUniqueAuditTypes(uniqueTypes);
    setUniqueUserNames(uniqueUsers);
  }, [records]);



  const filteredRecords = records.filter((record) => {
    const { accountName, opportunityName, auditType, userName, date } = record;
    const { startDate, endDate } = filters;

    // Apply filters
    const isAccountNameMatch = !filters.accountName || record.accountName === filters.accountName;
    const isOpportunityNameMatch = !filters.opportunityName || opportunityName.toLowerCase().includes(filters.opportunityName.toLowerCase());
    const isAuditTypeMatch = !filters.auditType || auditType.toLowerCase().includes(filters.auditType.toLowerCase());
    const isUserNameMatch = !filters.userName || userName.toLowerCase().includes(filters.userName.toLowerCase());


    // Check date range (if provided)
    const isDateInRange = (!startDate || date >= new Date(startDate)) && (!endDate || date <= new Date(endDate));

    return isAccountNameMatch && isOpportunityNameMatch && isAuditTypeMatch && isUserNameMatch && isDateInRange;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };



  const handleEditClick = (id) => {
    setEditRecordId(id);
  };

  // const handleDeleteClick = (id) => {
  //   dispatch(deleteRecord(id));
  // };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
          dispatch(deleteRecord(id));
        }
  };

  const handleEditComplete = () => {
    setEditRecordId(null); // Set editRecordId to null to exit edit mode
  };

  const handleAddRecordClick = () => {
    setIsAddingRecord(true); // Show the RecordForm component
  };

  

  return (
    <div class="myTable main">
      <h2>Quality Summary</h2>
      {/* <button onClick={handleAddRecordClick}>Add Record</button> Add Record button */}
      {/* <Link to="/add-record">Add Record</Link> */}
      <Button variant="contained" style={{ marginBottom: '10px' }}>
  <Link to="/add-record" style={{ textDecoration: 'none', color: 'white' }}>
    Add Record
  </Link>
</Button>

      <form className='filter'>
        <div className="row">
        <div className="column" style={{padding:'10px'}}>
          {/* <label>Account Name:</label> */}
          <select name="accountName" value={filters.accountName} onChange={handleFilterChange} style={{height:'30px', width:'120px'}} >
            <option value="">All Accounts</option>
            {uniqueAccountNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
              ))}
              </select>
        </div>
        <div class="column" style={{padding:'10px'}}>
          {/* <label>Opportunity Name:</label> */}
          <select name="opportunityName" value={filters.opportunityName} onChange={handleFilterChange} style={{height:'30px', width:'120px'}}>
            <option value="">All Opportunities</option>
            {uniqueOpportunityNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div class="column" style={{padding:'10px'}}>
          {/* <label>Audit Type:</label> */}
          <select name="auditType" value={filters.auditType} onChange={handleFilterChange} style={{height:'30px', width:'120px'}}>
          <option value="">All Audits</option>
            {uniqueAuditTypes.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div class="column" style={{padding:'10px'}}>
          {/* <label>User Name:</label> */}
          <select name="userName" value={filters.userName} onChange={handleFilterChange} style={{height:'30px', width:'120px'}}>
          <option value="">All Users</option>
            {uniqueUserNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        
        <div class="column" style={{padding:'10px'}}>
          {/* <label>Start Date:</label> */}
          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} style={{height:'30px', width:'120px'}} />
        </div>
        <div class="column" style={{padding:'10px'}}>
          {/* <label>End Date:</label> */}
          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} style={{height:'30px', width:'120px'}}/>
        </div>
        </div>
      </form>


<TableContainer component={Paper} >
<Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableRow>
            <TableCell>Account Name</TableCell>
            <TableCell>Opportunity Name</TableCell>
            <TableCell>Audit Type</TableCell>
            <TableCell>User Name</TableCell>
            {/* <th>Question 1</th>
            <th>Question 2</th>
            <th>Question 3</th>
            <th>Question 4</th>
            <th>Question 5</th>
            <th>Question 6</th>
            <th>Question 7</th>
            <th>Question 8</th>
            <th>Question 9</th>
            <th>Question 10</th> */}
            <TableCell>Percentage</TableCell>
            {/* <th>Comments</th> */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.accountName}</TableCell>
              <TableCell>{record.opportunityName}</TableCell>
              <TableCell>{record.auditType}</TableCell>
              <TableCell>{record.userName}</TableCell>
              {/* <td>{record.question1}</td>
              <td>{record.question2}</td>
              <td>{record.question3}</td>
              <td>{record.question4}</td>
              <td>{record.question5}</td>
              <td>{record.question6}</td>
              <td>{record.question7}</td>
              <td>{record.question8}</td>
              <td>{record.question9}</td>
              <td>{record.question10}</td> */}
              <td>{record.totalPercentage}%</td>
              {/* <td>{record.comments}</td> */}
              <TableCell>
                {editRecordId === record.id ? (
                  // <EditRecord record={record} onComplete={handleEditComplete} />
                  <Link to={`/edit-record/${record.id}`} onComplete={handleEditComplete}>Edit</Link>
                ) : (
                  <>
                    <Button variant="outlined" onClick={() => handleEditClick(record.id)}><Link to={`/edit-record/${record.id}`} onComplete={handleEditComplete}>Edit</Link></Button>
                    <Button variant="outlined" onClick={() => handleDeleteClick(record.id)}>Delete</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isAddingRecord && <RecordForm />} 
</TableContainer>
     
    </div>
  );
};

export default RecordList;
