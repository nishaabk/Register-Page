import {useState,useEffect} from 'react';
import { useRef } from 'react';
import {Link} from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../api/http-common';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[#@!%]).{8,20}$/;
const REGISTER_URL = '/addUser';

const Passenger = ()=>{

    const userRef = useRef();
    const errRef = useRef();

    const[userName,setUserName] = useState('');
    const[validName,setValidName]=useState(false);
    const[userFocus,setUserFocus]=useState(false);

    const[password,setPassword]=useState('');
    const[validPassword,setValidPassword]=useState(false);
    const[pwdFocus,setPwdFocus]=useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setValidName(USER_REGEX.test(userName));

    },[userName])

    useEffect(()=>{
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password=== matchPwd)
    },[password,matchPwd]);

    useEffect(()=>{
        setErrMsg('');
    },[userName,password,matchPwd])

    

    const handleSubmit =async (e)=>{
          e.preventDefault();
          const v1 = USER_REGEX.test(userName);
          const v2 = PWD_REGEX.test(password);
         
          if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
          }
        try{
            const response = await axiosInstance.post(REGISTER_URL,
                JSON.stringify({ userName, password,firstName,lastName, }),
                setSuccess(true),
                {
                    headers: { 'Content-Type': 'application/json' }
                    
                    //withCredentials: true
                }
            );
            console.log(response?.data);
            const token  = response?.data.token;
            const roles=response?.data.roles;
            
            localStorage.setItem('userDetails',JSON.stringify(response.data))
            setUserName(' ')
            setPassword(' ')
            setMatchPwd(' ')
        }
        catch(err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

        }

        return(

        <>
        {success ? (
            <section>

               <h1>Success!</h1>
               <p>
                <Link to = "/userLogin">Login In</Link>
               </p>


            </section>
        ):(

     <section>
         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
         <h1>Register</h1>
         <form onSubmit={handleSubmit}>
           <label htmlfor="userName">UserName
           <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !userName ? "hide" : "invalid"} />
           </label>
           <input 
           type='text'
           id='username'
           ref={userRef}
           autoComplete='off'
           onChange={(e)=>setUserName(e.target.value)}
           onFocus={()=>setUserFocus(true)}
           onBlur={()=>setUserFocus(false)}
           value={userName}
        
           />
           
           <p id="uidnote" className={userFocus && userName && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                            </p>
           <label>Password
           <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
           </label>
           <input 
           type='password'
           id='password'
           onChange={(e)=>setPassword(e.target.value)}
           onFocus={()=>setPwdFocus(true)}
           onBlur={()=>setPwdFocus(false)}
           value={password}/>

<p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                        <label>Confirm Password
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                        type='password'
                        id='confirmpwd'
                        value={matchPwd}
                        onChange={(e)=>setMatchPwd(e.target.value)}
                        onFocus={()=>setMatchFocus(true)}
                        onBlur={()=>setMatchFocus(false)}
                        />

<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label>FirstName</label>
                        <input
                        type='text'
                        name='firstname'
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}/>


                        <label>LastName</label>
                        <input
                        type='text'
                        value={lastName}
                        name='lastname'
                        onChange={(e)=>setLastName(e.target.value)}
                        />

                        

                        <button >Register</button>
         



         </form>
              <p>
                Already registered?<br/>
                <Link to ="/userlogin">Login In</Link>
              </p>


     </section>

        )}
        
        
        
        
        
        </>





        )

    }

    export default User;