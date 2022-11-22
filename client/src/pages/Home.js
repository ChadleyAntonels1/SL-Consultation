import axios from 'axios';
import React, { useEffect } from 'react'
import Layout from '../components/Layout';


const Home = () => {
  const getData = async () => {
   try {
      const response = await axios.post("/api/user/get-id",{},{
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
    
       
           <Layout><div className='heading'>home page</div></Layout>
          
        
    
    
    
  )
};

export default Home;