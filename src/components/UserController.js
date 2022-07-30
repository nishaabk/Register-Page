import {Link} from 'react-router-dom';
const UserController=()=>{
  
    return(
<div className="navbar-nav mr-auto">
         

          <li className="nav-item">
            <Link to={"/viewAllUsers"} className="nav-link">
              Get All users
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addUser"} className="nav-link">
              Add User
            </Link>
          </li>
    
          
        </div>
    )
}

export default UserController;