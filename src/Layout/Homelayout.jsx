import React, { createContext, use, useEffect, useState } from 'react'
import Header from '../component/Header/Navbar'
import Navbar from '../component/Header/Navbar'
import axios from 'axios';
import { auth } from '../firebase'
import { Helmet } from 'react-helmet-async';
import { createUserWithEmailAndPassword, linkWithCredential, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Outlet, useNavigate } from 'react-router'
import Footer from '../component/Footer/Footer';
import { toast } from 'react-toastify';

const provider = new GoogleAuthProvider();

export const vlalueContext=createContext()
const a=10


function Homelayout() {
  const navigate= useNavigate();

  const [user,setUser]=useState(null)
  const [loading, setLoading] = useState(true);

  const createUser=(email,password)=>{
    createUserWithEmailAndPassword(auth, email, password)
  }

  const signIngoogle= async()=>{
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/');
      toast.success('Google login successful')
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  }

  const handleLogin=(email,password)=>{

    signInWithEmailAndPassword(auth, email, password)
  
  .then((userCredential) => {
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorMessage = error.message;

  });

  }

  const signOutFromPage=()=>{signOut(auth).then(() => {
    //console.log("Signout successfully...")
   
 
  }).catch((error) => {
   // console.log(error)
  });
};

const updateUser=(upadateData)=>{
 return updateProfile(auth.currentUser,upadateData)

}
const handlePassword=(email)=>{
  sendPasswordResetEmail(auth, email)
  .then(() => {
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //console.log(errorMessage)
  });
}


    const contextValue={
        createUser,a,
        signIngoogle,
        handleLogin,
        signOutFromPage,
        user,
        updateUser,
        setUser,
        loading,
       handlePassword
        
        
    }
      
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    setUser(currentUser); 
  setLoading(false)
  if(currentUser?.email){
  axios.post('https://car-rental-azure-zeta.vercel.app/jwt', { email: currentUser.email }, { withCredentials: true })
  .then(res => console.log('JWT Response:', res.data))
  .catch(error => console.error('JWT Error:', error));
  }
    else {
      axios.post('https://car-rental-azure-zeta.vercel.app/logout', {}, { withCredentials: true })
        .then(res => console.log('JWT cleared:', res.data))
        .catch(err => console.error('Logout Error:', err));
    }
  });

  return () => unsubscribe(); 
}, []);

    
  return (


    <div className='mt-0'>

<vlalueContext.Provider value={contextValue}>  

<Helmet>
        <title>Home | CarZone</title>
        <meta name="description" content="Welcome to the homepage of My App" />
      </Helmet>
      
<Navbar></Navbar>
        <Outlet></Outlet>
      <Footer></Footer>  
</vlalueContext.Provider>
    </div>
  )
}

export default Homelayout
