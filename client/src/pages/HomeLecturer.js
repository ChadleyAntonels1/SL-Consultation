import axios from 'axios';
import React, { useEffect } from 'react'
import LayoutLecturer from '../components/LayoutLecturer';


const HomeLecturer = () => {
  const getData = async () => {
   try {
      const response = await axios.post("/api/lecturer/get-id",{},{
        headers: {
          Authorization:"Bearer"+ localStorage.getItem("token"),
        
        },

      });
      console.log(response.data);
    }catch(e){
      console.log(e)
    }
  }

  useEffect( ()=>{
    getData();
 },[])

  return (
    
       
           <LayoutLecturer><div className='heading'>home page</div></LayoutLecturer>
          
        
    
    
    
  )
};

export default HomeLecturer;