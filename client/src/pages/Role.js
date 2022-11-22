import React from 'react'
import { Link } from "react-router-dom";


const Role= ()=> {
  return (
    <>
    <section className="heading">
        <h1>
           Roles
        </h1>
        <p>Please select your role</p>
      </section>

    <div className='form'>
        <Link to ='/login' className = 'btn btn-block'>Student</Link>
        <Link to ='/loginLecturer' className = 'btn btn-block'>Lecturer</Link>
        <Link to ='/loginAdmin' className = 'btn btn-block'>admin</Link>
    </div>
    </>
  )
}

export default Role