/* import { useRef , useState , useEffect,useContext} from 'react'
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { faLocationPinLock } from '@fortawesome/free-solid-svg-icons';

const Login=()=>{
   const {setAuth} =useAuth();
    
    const navigate=useNavigate();
    const location = useLocation();
    const from=location.state?.from?.pathname || '/';
  
    const userRef=useRef();

    const errRef=useRef();
    const [username ,setUsername] =useState('');
    const [password ,setPassword] =useState('');
    const [errMsg,setErrMsg]=useState();
    
    //to set the focus on first input when the compoent loads
    useEffect(()=>{userRef.current.focus();
        
    },[])
    
     //to  empty out any error message , if user changes username or password
     useEffect(()=>{
        setErrMsg('');

     },[username,password])

     const submitHandler = async (e)=>{
            e.preventDefault();
            console.log(username+''+password);
        
     } 

     return (
     
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
             aria-live="assertive">{errMsg}</p>
             <h1>Sign In</h1>
             <form onSubmit={submitHandler}>

            <label htmlFor='username'>Username</label>
            <input type='text' 
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            required
    />
       <label htmlFor='password'>password</label>
            <input
             type='password' 
            id='password'
            autoComplete="off"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            required
    />

   <button>Sign In </button>
             </form>
             <p> Need an account<br/>
             <span className='line'>
               
                <Link to="/register">Sign Up</Link>
                </span>
                  
                </p>
        </section>
     )

}

export default Login; */
import { Dropdown } from "react-bootstrap";


function Login (){

  return(
        <Dropdown>
          <Dropdown.Toggle variant = "success" id="dropdown-basic">
           User Role
          </Dropdown.Toggle>

          <Dropdown.Menu><br/>
            <br/><br/><Dropdown.Item href = "userLogin">User</Dropdown.Item><br/><br/>
            <Dropdown.Item href = "adminLogin">Admin</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  
    
  )

}

export default Login;