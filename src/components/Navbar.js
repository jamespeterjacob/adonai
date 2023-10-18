import React from 'react';
import { useState, useEffect } from "react";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { Link, resolvePath, useMatch, useResolvedPath, useLocation, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const [displayusername, displayusernameupdate] = useState('');
  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      if (location.pathname === '/login' || location.pathname === '/register') {
          showmenuupdateupdate(false);
      } else {
          showmenuupdateupdate(true);
          let username = sessionStorage.getItem('username');
          if (username === '' || username === null) {
              usenavigate('/login');
          } else {
              displayusernameupdate(username);
          }
      }

  }, [location])

  return <nav>
    {showmenu &&
    <div className='row'>
      <div className='row'>
      <div className='nav'>
<Link to="/" className="site-title" >Ceferin Web Solutions</Link>
                    {/* <Link to={'/'}>Home</Link>
                    <Link to={'/company'}>Companies</Link>
                    <Link to={'/user'}>Users</Link> */}
                    <ul>
      {/* <li className='active'>
      <Link to="/login"  >Login</Link>
      </li> */}
      {/* <li>
      <Link to="/register" >Register</Link>
      </li> */}
      {/* <li>
      <Link to="/recordlist" >Quality</Link>
      </li> */}
      <li><span style={{ color:'black', alignContent:'center', verticalAlign:'middle'  }}>Hello <b>{displayusername}</b></span></li>
      <li><Link style={{ float: 'right' }} to={'/login'}>Logout</Link></li>
    </ul>
                    
                    
                </div>
                </div>

<div className='row'>
<div id="mySidenav" className="sidenav">
  {/* <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> */}
  {/* <button onClick={openNav}>Open Nav</button>
      <SideNav isOpen={isSideNavOpen} onClose={closeNav} /> */}
  <a href="#">About</a>
  <Link to="/recordlist" >Quality</Link>
  <Link to="/joblist" >Jobs</Link>
  <Link to="/applicantlist" >Applicants</Link>
  <a href="#">Contact</a>
 
</div>
</div>
<div className='main'>
 
</div>

    </div>
                
                
                
            }
            
           




    
  
  </nav> 
}

function CustomLink({to, children, ...props}) {
  const useResolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvePath.pathname, end: true})
  return (
    <li className={ isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
        </Link>

    </li>
  )
}