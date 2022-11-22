import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Lecturer from './pages/Lecturer';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Availibilty from './pages/Availibilty';
import Appointments from './pages/Appointments';
import Role from './pages/Role';
import LoginLecturer from './pages/LoginLecturer';
import RegisterLecturer from './pages/RegisterLecturer';
import HomeLecturer from './pages/HomeLecturer';
import ProfileLecturer from './pages/ProfileLecturer';




function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false}/>
    
      <Routes>
        
        <Route path = '/role' element={<Role/>}/>

        <Route path = '/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path = '/register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path = '/loginLecturer' element={<LoginLecturer/>}/>
        <Route path = '/registerLecturer' element={<RegisterLecturer/>}/>
        <Route path = '/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path = '/homeLecturer' element={<ProtectedRoute><HomeLecturer/></ProtectedRoute>}/>
        <Route path = '/profileLecturer' element={<ProfileLecturer/>}/>

        <Route path = '/lecturer' element={<Lecturer/>}/>
        <Route path = '/admin' element={<Admin/>}/>
        <Route path = '/profile' element={<Profile/>}/>
        <Route path = '/availibilty' element={<Availibilty/>}/>
        <Route path = '/appointments' element={<Appointments/>}/>




         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
