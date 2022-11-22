import React from 'react';
import axios from 'axios';
import {Button, Form, Input} from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate()
  const onFinish = async(values) => {
    try{
      const response = await axios.post('/api/user/register', values);
      if (response.data.success){
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate('/login')
      } else {
        toast.error(response.data.message);
      }
    } catch(error) {
      toast.error("Something went wrong");
    }
  }


  
  return (  
    <>
      <section className="heading">
        <h1>
          Student Register
        </h1>
        <p>Please create an account</p>
      </section>

      

      <Form className='form' layout = 'vertical' onFinish = {onFinish}>
                    <Form.Item className='form-group' label = 'Name' name = 'name'>
                        <Input placeholder = 'Enter Your Name'/>
                    </Form.Item>

                    <Form.Item className='form-group' label = 'Email' name = 'email'>
                        <Input placeholder = 'Enter Email'/>
                    </Form.Item>

                    <Form.Item className='form-group' label = 'Password' name = 'password'>
                        <Input placeholder = 'Enter Your Password'/>
                    </Form.Item>

                    <Form.Item className='form-group' label = 'role' name = 'role'>
                        <Input placeholder = 'user'/>
                    </Form.Item>

                    <Button className = 'form-group btn btn-block' htmlType = 'submit'>REGISTER</Button>
                    <Link to ='/login' className = 'btn btn-reverse'>Login Here</Link>
                    <Link to ='/role' className='btn btn-reverse'>Select Roles</Link>

                </Form>
    </>
    );
};

export default Register;