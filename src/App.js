import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Home from './components/dashboard/Home'
import RecordList from './components/quality/RecordList';
import RecordForm from './components/quality/RecordForm';
import EditRecord from './components/quality/EditRecord';
import JobList from './components/jobs/JobList';
import JobForm from './components/jobs/JobForm';
import EditJob from './components/jobs/EditJob';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Route, Routes, HashRouter } from 'react-router-dom';
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
      <HashRouter>

     
      <Routes>
       
       <Route path='/adonai/#home' element={<Home/>}></Route> 
      <Route path='/adonai/#login' element={<Login/>}>Login</Route>
      <Route path='/adonai/#register' element={<Register/>}>Register</Route>
      <Route path="/adonai/#recordlist" element={<RecordList />} />
      <Route path="/adonai/#add-record" element={<RecordForm />} />
      <Route path="/adonai/#edit-record/:id" element={<EditRecord />} />
      <Route path="/adonai/#joblist" element={<JobList />} />
      <Route path="/adonai/#add-job" element={<JobForm />} />
      <Route path="/adonai/#edit-job/:id" element={<EditJob />} />
      
    </Routes>
    </HashRouter>
      </div>
    </Provider>
  );
}

export default App;