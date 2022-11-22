import React, { useEffect} from 'react'
import '../layout.css';
import axios from 'axios';

import {Link, useLocation, useNavigate } from 'react-router-dom';
import {Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {setUser} from "../redux/userSlice"

const Layout=({children}) =>{

  const navigate = useNavigate()
  const location = useLocation();
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await axios.post("/api/user/get-id", {token: localStorage.getItem("token")}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success){
        dispatch (setUser(response.data.data));
      }else {
        localStorage.clear();
        navigate("/login");
      }

    } catch (error){
      localStorage.clear();
      navigate("/");
    }

  }
  useEffect( () =>{
    if(!user) {
      getUser();
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  
  const userMenu =[
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Availibilty',
      path: '/availibilty',
      icon: 'ri-file-list-line',
    },
    
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-user-line',
    },
    
  ];
  const menuToBeRendered = userMenu;
  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className='sidebar'>
          <div className='sidebar-header'>
          <div className=' h2'>Student Home</div>
        </div>
        <div className='menu'>
          {menuToBeRendered.map((menu => {
            const isActive = location.pathname === menu.path
            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                    <i className={menu.icon}></i>
                     <Link to={menu.path}>{menu.name}</Link>
                   </div>
                   
          }))}
        </div>
        </div>
        <div className='content'>
          <div className='header h3'>
            S-L Consultation
            <div className='d-flex align-items-center px-4'>
                <i className='ri-notification-line header-action-icon mr-2'></i>
              <Link className=' btn anchor mx-2' to='/profile'>{user?.name} </Link>
              <Button className=' ri-login-box-line btn' onClick={onLogout}> Logout</Button>
          
            </div>
          </div>
          <div className='body'>
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Layout