import { useEffect, useState } from "react"
import {Link} from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from "../api/http-common";

function Admin (){

    const USER_REGEX=/^[A-z][A-z0-9-_]{3,10}$/
    const PWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@!%]).{8,10}$/
    const REGISTER_URL = '/addAdmin';

    const [adminUserName,setAdminUserName]=useState('');
    const[validName,setValidName]=useState(false);

    const [adminPassword,setAdminPassword] = useState('');
    const[validPassword,setValidPassword]=useState(false);

    const [matchPassword,setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
        setValidName(USER_REGEX.test(adminUserName));

    },[adminUserName])

    useEffect(()=>{
        setValidPassword(PWD_REGEX.test(adminPassword));
        setValidMatch(adminPassword=== matchPassword)
    },[adminPassword,matchPassword]);

    useEffect(()=>{
        setErrMsg('');
    },[adminUserName,adminPassword,matchPassword])


    const handleSubmit =async (e)=>{
        e.preventDefault();
        const v1 = USER_REGEX.test(adminUserName);
        const v2 = PWD_REGEX.test(adminPassword);
       
        if(!v1 || !v2){
          setErrMsg("Invalid Entry");
          return;
        }
      try{
        
      const response = await axiosInstance.post(REGISTER_URL,
        JSON.stringify({ adminUserName, adminPassword }),
        setSuccess(true),
        {
            headers: { 'Content-Type': 'application/json' }
    
        }
    );
    console.log(response?.data);
    const token  = response?.data.token;
            const roles=response?.data.roles;
            
            localStorage.setItem('adminDetails',JSON.stringify(response.data))
      }
      catch(err){
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else {
              setErrMsg('Registration Failed')
          }
        
      }

      }

      return(

        

            <>
            {success ? (
                <section>
    
                   <h1>Success!</h1>
                   <p>
                    <Link to = "/adminLogin">Login In</Link>
                   </p>
    
    
                </section>
            ):(
    
         <section>
             
             <h1>Register</h1>
             <form onSubmit={handleSubmit}>
               <label htmlFor="adminUserName">UserName
               <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !adminUserName ? "hide" : "invalid"} />
               </label>
               <input 
               type='text'
               id='username'
               
               autoComplete='off'
               onChange={(e)=>setAdminUserName(e.target.value)}
              
               value={adminUserName}
            
               />
               
               
               <label>Password
               <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
             <FontAwesomeIcon icon={faTimes} className={validPassword || !adminPassword ? "hide" : "invalid"} />
               </label>
               <input 
               type='password'
               id='password'
               onChange={(e)=>setAdminPassword(e.target.value)}
              
               value={adminPassword}/>
    
  
    
                            <label>Confirm Password
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                            </label>
                            <input
                            type='password'
                            id='confirmpwd'
                            value={matchPassword}
                            onChange={(e)=>setMatchPassword(e.target.value)}
                            
                            />
    
   
                            
                            <button >Register</button>
             
    
    
    
             </form>
                  <p>
                    Already registered?<br/>
                    <Link to ="/adminlogin">Login In</Link>
                  </p>
    
    
         </section>
    
            )}
            
            
            
            
            
            </>
    
    
    
    
    
            )
      



}
export default Admin;