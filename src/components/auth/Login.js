import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeProvider } from "styled-components";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

 

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            fetch("https://my-json-server.typicode.com/jamespeterjacob/jsonserver/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username',username);
                        sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/')
                    }else{
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={"username": username,
            "password": password};
            fetch("https://my-json-server.typicode.com/jamespeterjacob/jsonserver:44308/User/Authenticate",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                }else{
                     toast.success('Success');
                     sessionStorage.setItem('username',username);
                     sessionStorage.setItem('jwttoken',resp.jwtToken);
                   usenavigate('/')
                }
                // if (Object.keys(resp).length === 0) {
                //     toast.error('Please Enter valid username');
                // } else {
                //     if (resp.password === password) {
                //         toast.success('Success');
                //         sessionStorage.setItem('username',username);
                //         usenavigate('/')
                //     }else{
                //         toast.error('Please Enter valid credentials');
                //     }
                // }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
       
            <Box className='logincontainer' style={{}}
      component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
      noValidate autoComplete="off">
        
                <form onSubmit={ProceedLogin} className="" >
                    
                    <div className="card" style={{backgroundColor:'lightgray', alignContent:'center'}}>
                        <div className="card-header" style={{verticalAlign:'', alignContent:'center'}}>
                            <div className="form-group" style={{alignContent:'center', padding:'20px'}}>
                            <h2>User Login</h2>
                            </div>
                        </div>
                        <div className="card-body" style={{backgroundColor:'lightgray', padding:'20px'}}>
                        <div>
        {/* <TextField
          error
          id="outlined-error"
          label="username"
        //   defaultValue="Hello World"
        /> */}
      </div>
                            <div className="form-group" >
                                {/* <label>User Name <span className="errmsg">*</span></label> */}
                                <TextField error id="outlined-error" label="username" value={username} onChange={e => usernameupdate(e.target.value)} className="" style={{minHeight:'30px'}} placeholder="Username" ></TextField>
                            </div>
                            <div className="form-group">
                                {/* <label>Password <span className="errmsg">*</span></label> */}
                                <TextField type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control" style={{minHeight:'30px'}} placeholder="Password"></TextField>
                            </div>
                        </div>
                        <div className="card-footer" style={{padding:'20px', alignContent:'center'}}>
                            <Button variant="contained" type="submit" className="btn btn-primary" style={{minHeight:'30px', minWidth:'80px'}}>Login</Button> 
                            <span style={{padding:'20px'}}>
                            <Link className="btn btn-success" to={'/register'} style={{minHeight:'30px'}}>Register</Link>
                            </span>
                            
                        </div>
                    </div>
                </form>
                </Box>
          
       
    );
}

export default Login;