import React, { useState } from 'react'
import Home from '../component/Home/Home'

import { Moon, Sun } from "lucide-react";
import { useLoaderData } from 'react-router';

import './HomePage.css'
import Navbar from '../component/Header/Navbar';
import Footer from '../component/Footer/Footer';

export default function Hoamepage() {
  const data= useLoaderData();
  console.log("Homepage data is ",data)
    const [isDark, setIsDark] = useState(false);
  const toggleTheme = (e) => {
    setIsDark(e.target.checked);
  };
  return (

    <div className={`${isDark ? 'dark-theme' : 'light-theme'}`}>
            <div className='dark_mode mb-4 flex justify-center items-center'>
        <input
          className='dark_mode_input '
          type="checkbox"
          id='darkmode-toggle'
          onChange={toggleTheme}
          checked={isDark}
        />
        <label className='dark_mode_label ' htmlFor='darkmode-toggle'>
          {isDark ? <Sun /> : <Moon />}
        </label>
      </div>
    
      <Home data={data}></Home>
  
      
      <Footer isDark={isDark}></Footer>
    </div>
  )
}
