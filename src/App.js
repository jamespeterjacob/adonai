import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import RecordList from './components/quality/RecordList';
import RecordForm from './components/quality/RecordForm';
import EditRecord from './components/quality/EditRecord';
import JobList from './components/jobs/JobList';
import JobForm from './components/jobs/JobForm';
import EditJob from './components/jobs/EditJob';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import { fetchRecords } from './actions';
import { fetchJobs } from './actions/jobActions';
// import { openNav, closeNav, isSideNavOpen, closeNav, SideNav } from './components/SideNav';



const store = createStore(reducers, applyMiddleware(thunk));

function App() {
  // const [isSideNavOpen, setSideNavOpen] = useState(false);

  // const openNav = () => {
  //   setSideNavOpen(true);
  // };

  // const closeNav = () => {
  //   setSideNavOpen(false);
  // };

  useEffect(() => {
    store.dispatch(fetchRecords(), fetchJobs());
  }, []);

  return (



    <Provider store={store}>

      <Navbar/>
      <div className=''>
      {/* <button onClick={openNav}>Open Nav</button>
      <SideNav isOpen={isSideNavOpen} onClose={closeNav} /> */}
      <Routes>
       
       {/* <Route path='/' element={<Home/>}></Route>  */}
      <Route path='/login' element={<Login/>}>Login</Route>
      <Route path='/register' element={<Register/>}>Register</Route>
      <Route path="/recordlist" element={<RecordList />} />
      <Route path="/add-record" element={<RecordForm />} />
      <Route path="/edit-record/:id" element={<EditRecord />} />
      <Route path="/joblist" element={<JobList />} />
      <Route path="/add-job" element={<JobForm />} />
      <Route path="/edit-job/:id" element={<EditJob />} />
      
    </Routes>
      </div>
    </Provider>
  );
}

export default App;