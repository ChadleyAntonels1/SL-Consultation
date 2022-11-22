import React, { useEffect} from 'react'
import '../layout.css';
import '../index.css';

import axios from 'axios';

import {  useNavigate   } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setUser} from "../redux/userSlice"
import Layout from '../components/Layout'

const Profile = ()=> {

  const navigate = useNavigate()
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
      navigate("/login");
    }

  }
  useEffect( () =>{
    if(!user) {
      getUser();
    }
  }, []);
  return (<>
    <Layout><div className='heading'>Profile</div>

    <div className='h2 '>
              <l><div className=' p ' >Name:  {user?.name} </div></l>
              <l><div className=' p ' >Email:  {user?.email} </div></l>
              <l><div className=' p ' >Role:  {user?.role} </div></l>


            </div>
            </Layout>
            </>
  )
}

export default Profile