import {useRef,useState,useEffect} from 'react'

import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/http-common';
const AdminLogin = ()=>{

    

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [adminUserName,setAdminUserName] = useState('');
    const [adminPassword,setAdminPassword] = useState('');
    const [errMsg,setErrMsg] = useState();

    const [success,setSuccess] = useState(false);

   

    


       
       
    useEffect(()=>{
        setErrMsg('');
    },[adminUserName,adminPassword])

    const submitHandler = async (e)=>{
        e.preventDefault();
         
        const response = await apiClient.post(`/adminLogin`,{adminUserName,adminPassword})
        console.log(response);
        navigate('/admincontroller');
    }

    return (

     <>

       {success ? (
       <section>
          successful!!!!
          <Link to = '/adminController'></Link>         
     
       </section>
       
       ):(

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
             aria-live="assertive">{errMsg}</p>
             <h1>Sign In</h1>
             <form onSubmit={submitHandler}>

            <label htmlFor='username'>Username</label>
            <input type='text' 
            id='username'
            
            autoComplete="off"
            onChange={(e)=>setAdminUserName(e.target.value)}
            value={adminUserName}
            
    />
       <label htmlFor='password'>Password</label>
            <input
             type='password' 
            id='password'
            autoComplete="off"
            onChange={(e)=>setAdminPassword(e.target.value)}
            value={adminPassword}
            
    />
    

   <button>Login </button>
             </form>
             
            

             <p> Need an account<br/>
            
        
                <Link to="/admin">Register</Link>
                </p>

        </section>
       )
}

</>
    )
}
             


export default AdminLogin;