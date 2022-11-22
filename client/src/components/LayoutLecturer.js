import React, { useEffect} from 'react'
import '../layout.css';
import axios from 'axios';

import {Link, useLocation, useNavigate   } from 'react-router-dom';
import {Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {setLecturer} from "../redux/lecturerSlice"

const LayoutLecturer =({children}) =>{

  const navigate = useNavigate()
  const location = useLocation();
  const {lecturer} = useSelector((state) => state.lecturer);
  const dispatch = useDispatch();

  const getLecturer = async () => {
    try {
      const response = await axios.post("/api/lecturer/get-id", {token: localStorage.getItem("token")}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success){
        dispatch (setLecturer(response.data.data));
      }else {
        localStorage.clear();
        navigate("/loginLecturer");
      }

    } catch (error){
      localStorage.clear();
      navigate("/loginLecturer");
    }

  }
  useEffect( () =>{
    if(!lecturer) {
      getLecturer();
    }
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/role");
  }

  const lecturerMenu =[
    {
      name: 'Home',
      path: '/homeLecturer',
      icon: 'ri-home-2-line',
    },
    
    {
      name: 'Appointments',
      path: '/appointments',
      icon: '',
    },
    {
      name: 'Profile',
      path: '/profileLecturer',
      icon: 'ri-user-line',
    },
    
  ];
  const menuToBeRendered = lecturerMenu;
  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className='sidebar'>
          <div className='sidebar-header'>
          <div className=' h2'>Lecturer Home</div>
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
              <Link className=' btn anchor mx-2' to='/profileLecturer'>{lecturer?.name}</Link>
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

export default LayoutLecturer