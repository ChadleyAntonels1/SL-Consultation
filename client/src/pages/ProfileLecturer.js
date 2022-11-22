import React, { useEffect} from 'react'
import '../layout.css';
import '../index.css';

import axios from 'axios';

import {  useNavigate   } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setLecturer} from "../redux/lecturerSlice"
import LayoutLecturer from '../components/LayoutLecturer'

const ProfileLecturer = ()=> {

  const navigate = useNavigate()
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
        navigate("/login");
      }

    } catch (error){
      localStorage.clear();
      navigate("/login");
    }

  }
  useEffect( () =>{
    if(!lecturer) {
      getLecturer();
    }
  }, []);
  return (<>
    <LayoutLecturer><div className='heading'>Profile</div>

    <div className='h2 '>
              <l><div className=' p ' >Name:  {lecturer?.name} </div></l>
              <l><div className=' p ' >Email:  {lecturer?.email} </div></l>
              <l><div className=' p ' >Role:  {lecturer?.role} </div></l>


            </div>
            </LayoutLecturer>
            </>
  )
}

export default ProfileLecturer