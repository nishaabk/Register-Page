/* import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
//import axios  from '../api/axios'; 
import {Link} from 'react-router-dom'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const ID_REGEX=/[0-9]/;
const ROLE_REGEX=/[A-Z]/;
const REGISTER_URL = '/register';
 
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
 
    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [userid, setUserid] = useState('');
    const [validId, setValidId] = useState(false);
    const [idFocus, setIdFocus] = useState(false);
 
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
 
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [userrole, setUserrole] = useState('');
    const [validRole, setValidRole] = useState(false);
    const [roleFocus, setRoleFocus] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
 
    useEffect(() => {
        userRef.current.focus();
    }, [])
 
    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidId(ID_REGEX.test(userid));
    }, [userid])

    useEffect(() => {
        setValidRole(ROLE_REGEX.test(userrole));
    }, [userrole])
 
 
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])
 
    useEffect(() => {
        setErrMsg('');
    }, [username,userid, password, matchPwd,userrole])
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = ID_REGEX.test(userid);
        const v4 = ROLE_REGEX.test(userrole);
        console.log(username+''+password+''+userid+''+userrole);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
         {
            /* const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                    //withCredentials: true
                }
            );
            console.log(response?.data);

            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUsername('');
            setPassword('');
            setMatchPwd(''); */
       /*  }
        try{console.log(username,password,userid,userrole);
        setSuccess(true);
    } 
        catch (err) {
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
    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/login">Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
 

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
 

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <label htmlFor="userid">
                            Userid:
                            <FontAwesomeIcon icon={faCheck} className={validId ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validId || !userid ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="number"
                            id="userid"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserid(e.target.value)}
                            value={userid}
                            required
                            aria-invalid={validId ? "false" : "true"}
                            aria-describedby="uid"
                            onFocus={() => setIdFocus(true)}
                            onBlur={() => setIdFocus(false)}
                        />
                        <p id="uid" className={idFocus && userid && !validId ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 numbers.<br />
                            Must begin with a number.<br />
                             numbers allowed.
                        </p>

                        <label htmlFor="userrole">
                            Userrole:
                            <FontAwesomeIcon icon={faCheck} className={validRole ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validRole || !userrole ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="userrole"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUserrole(e.target.value)}
                            value={userrole}
                            required
                            aria-invalid={validRole ? "false" : "true"}
                            aria-describedby="urolenote"
                            onFocus={() => setRoleFocus(true)}
                            onBlur={() => setRoleFocus(false)}
                        />
                        <p id="urolenote" className={roleFocus && userrole && !validRole ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            A to Z characters.<br />
                            Must begin with a character.<br />
                            characters allowed.
                        </p>
 
                        <button disabled={!validName || !validPwd || !validMatch ||!validId ||!validRole ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            
                           <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}
 
export default Register */ 

import { Dropdown } from "react-bootstrap";


function Register (){

  return(
        <Dropdown>
          <Dropdown.Toggle variant = "success" id="dropdown-basic">
           User Role 
          </Dropdown.Toggle>

          <Dropdown.Menu><br/>
            <br/><br/><Dropdown.Item href = "user">User</Dropdown.Item><br/><br/>
            <Dropdown.Item href = "admin">Admin</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  
    
  )

}

export default Register;