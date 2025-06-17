import React, { useContext } from 'react'
import logo from "../../assets/hhh.jpg"
import { Link, NavLink, useNavigate } from 'react-router'
import { vlalueContext } from '../../Layout/Homelayout'
import './Navbar.css'
import { toast } from 'react-toastify'
function Navbar() {
      
        const {a,signOutFromPage,user,loading  }=useContext(vlalueContext);
     
        const navigate = useNavigate()
        const handleLogout=()=>{
          signOutFromPage()
          toast.success("SignOut successful");
        }
    
        if (loading) {
          return <span className="loading loading-spinner loading-xl mx-auto"></span>; // or a spinner, etc.
        }

  return (
    
<div >
  <div className="navbar bg-base-100 shadow-sm ">
    
  <div className="navbar-start px-24px">
    <div className="dropdown">

      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
     { user?(
    <>
  <ul>

      <li><NavLink className="ml-4 font-semibold text-xl" to="/">Home</NavLink></li>
     
     <li>  <NavLink className="ml-4 font-semibold text-xl" to="/available">Available Cars</NavLink></li>
   <li>    
      <NavLink className="ml-4 font-semibold text-xl" to="/addCars">Add-Car</NavLink></li>
<li>      
      <NavLink className="ml-4 font-semibold text-xl" to={`/cars/${user?.email}`}> My-Cars</NavLink>
      </li>

<li>   
     <NavLink className="ml-4 font-semibold text-xl" to="/bookings"> My-Bookings </NavLink></li>

      
    </ul>


    </>
  ):(<>

  <NavLink to="/">Home</NavLink>
    <NavLink className="ml-4 font-semibold text-xl"  to="/available"> Available Cars</NavLink>
  </>)
  
  }
      </ul>
    </div>
    <img className="btn btn-ghost w-42 h-full" src={logo}  alt="" />
    
  </div>
  <div className="navbar-center hidden lg:flex">

    <div>

  { user?(
    <>
  <ul className="menu menu-horizontal px-1 py-4">
      <NavLink  className="ml-4 font-semibold text-xl"  to="/">Home</NavLink>
       <NavLink className="ml-4 font-semibold text-xl"  to="/available"> Available Cars</NavLink>
      <NavLink  className="ml-4 font-semibold text-xl" to="/addCars">Add Car</NavLink>
      <NavLink  className="ml-4 font-semibold text-xl" to={`/cars/${user?.email}`}> My Cars</NavLink>
      <NavLink  className="ml-4 font-semibold text-xl" to="/bookings"> My Bookings </NavLink>
      
    </ul>


    </>
  ):(<>

  <NavLink className="ml-4 font-semibold text-xl" to="/">Home</NavLink>
     <NavLink className="ml-4 font-semibold text-xl"  to="/available"> Available Cars</NavLink>
  </>)
  
  }

    </div>
    
  </div>




     <div className="navbar-end">
   <p className='px-3 md:block hidden'>{user?.email}</p>
  {user ? (
  <>
    <Link to="/" onClick={handleLogout} className="btn bg-blue-600">Sign out</Link>
   
<img className='w-14 rounded-full'  title={user.displayName} src={`${user ? user.photoURL : "nai "}`}/>

  </>
  
) : (
  <> 
   <Link to="/signup" className="btn bg-blue-600">Login</Link>

   
  </>
  
)}


  </div> 

  
</div>
</div>
    

  )
}

export default Navbar
