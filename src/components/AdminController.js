import {Link} from 'react-router-dom';
const AdminController=()=>{
  
    return(
<div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/getAllRoutes"} className="nav-link">
              Route
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addRoute"} className="nav-link">
              Add Route
            </Link>
          </li>
        </div>
    )
}

export default AdminController;