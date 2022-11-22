import React from 'react';
import {Button, Form, Input} from "antd";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginLecturer = () => {

  const navigate = useNavigate()
  const onFinish = async(values) => {
    try{
      const response = await axios.post('/api/lecturer/login', values);
      if(response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting you to the home page");
        localStorage.setItem("token", response.data.data);
        navigate("/homeLecturer");

      }else {
        toast.error(response.data.message);
      }

    }catch(error){
      toast.error("something went wrong");
    }
  };

  return (
    
    <>
      <section className='heading'>
        <h1>
            Lecturer Login
        </h1>
        <p>Please login to your account</p>
      </section>

      <Form className='form' layout = 'vertical' onFinish = {onFinish}>

                    <Form.Item className='form-group' label = 'Email' name = 'email'>
                        <Input placeholder = 'Enter Email'/>
                    </Form.Item>

                    <Form.Item className='form-group' label = 'Password' name = 'password'>
                        <Input placeholder = 'Enter Your Password'/>
                    </Form.Item>


                    <Button className='form-group btn btn-block'  htmlType = 'submit'>Login</Button>
                    <Link to ='/registerLecturer' className='btn btn-reverse'>Register Here</Link>
                    <Link to ='/role' className='btn btn-reverse'>Select Roles</Link>
                </Form>
    </>
    
    )
}

export default LoginLecturer;