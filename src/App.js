import Home from './components/Home';
import Layout from './components/Layout';

import Admin from './components/Admin';

import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';

import LinkPage from './components/LinkPage';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

import AdminController from'./components/AdminController';
import AdminLogin from './components/AdminLogin';
function App() {
 
  
      return (
        <Routes>
          <Route  path='/' element={<Layout />}>
            
            
            <Route index element={<Home />} />
           
           { <Route path="login" element={<Login />} /> }
           <Route path="register" element={<Register />} /> 
            
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
     
            
             
     
      <Route path="admin" element={<Admin />} />
      <Route path = "adminLogin"element={<AdminLogin/>}/>
      <Route path = "adminController"element={<AdminController/>}/>
             
     
           
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      );
      }   
export default App;