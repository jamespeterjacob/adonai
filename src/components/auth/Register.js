import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("female");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { id, name, password, email, phone, country, address, gender };
            if (IsValidate()) {
            //console.log(regobj);
            fetch("https://my-json-server.typicode.com/jamespeterjacob/adonai/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/https://jamespeterjacob.github.io/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div className="row main" style={{backgroundColor: 'lightgray', width:'25%', position:'fixed', float:'right', minHeight:'100%'}}>
            <div className="offset-lg-3 col-lg-6" style={{  }}>
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card" style={{backgroundColor:'lightgray', alignContent:'center', padding:'20px'}}>
                        <div className="card-header" >
                            <h2>Register</h2>
                        </div>
                        <div className="card-body" style={{backgroundColor:'lightgray'}}>

                            <div className="row" >
                                <div className="col-lg-6" >
                                    <div className="form-group">
                                        {/* <label>User Name <span className="errmsg">*</span></label> */}
                                        <input value={id} onChange={e => idchange(e.target.value)} className="form-control" placeholder="Username" style={{minHeight:'30px'}}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        {/* <label>Password <span className="errmsg">*</span></label> */}
                                        <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control" placeholder="Password" style={{minHeight:'30px'}}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        {/* <label>Full Name <span className="errmsg">*</span></label> */}
                                        <input value={name} onChange={e => namechange(e.target.value)} className="form-control" placeholder="Full Name" style={{minHeight:'30px'}}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        {/* <label>Email <span className="errmsg">*</span></label> */}
                                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control" placeholder="Email" style={{minHeight:'30px'}}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        {/* <label>Phone <span className="errmsg"></span></label> */}
                                        <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control" placeholder="Phone" style={{minHeight:'30px'}}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        {/* <label>Country <span className="errmsg">*</span></label> */}
                                        <select value={country} onChange={e => countrychange(e.target.value)} className="form-control" placeholder="Country" style={{minHeight:'30px'}}>
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        {/* <label>Address</label> */}
                                        <textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control" placeholder="Address" style={{minHeight:'50px'}}></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        {/* <label>Gender</label>
                                        <br></br> */}
                                        <input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
                                        <label>Female</label>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="card-footer" style={{padding:'20px', alignContent:'center'}}>
                            <button type="submit" className="btn btn-primary" style={{minHeight:'30px', minWidth:'80px'}}>Register</button>
                            <span style={{padding:'20px'}}> <Link to={'/adonai/#login'} className="btn btn-danger">Close</Link></span>
                           
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;