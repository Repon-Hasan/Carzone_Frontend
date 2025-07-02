import React, { useContext } from 'react';
import logo from '../../assets/hhh.jpg';
import { Link, NavLink, useNavigate } from 'react-router';
import { vlalueContext } from '../../Layout/Homelayout';
import './Navbar.css';
import { toast } from 'react-toastify';

function Navbar() {
  const { signOutFromPage, user, loading } = useContext(vlalueContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutFromPage();
    toast.success('Sign out successful');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  const commonLinks = (
    <>
      <NavLink className="font-semibold text-xl text-black" to="/">Home</NavLink>
      <NavLink className="font-semibold text-xl text-black" to="/available">Available Cars</NavLink>
      <NavLink className="font-semibold text-xl text-black" to="/contact">Contact</NavLink>
    </>
  );

  const guestLinks = (
    <>
      <NavLink className="font-semibold text-xl text-black" to="/about">About</NavLink>
      <NavLink className="font-semibold text-xl text-black" to="/faq">FAQ</NavLink>
    </>
  );

  const userLinks = (
    <>
      <NavLink className="font-semibold text-xl text-black" to="/addCars">Add Car</NavLink>
      <NavLink className="font-semibold text-xl text-black" to={`/cars/${user?.email}`}>My Cars</NavLink>
      <NavLink className="font-semibold text-xl text-black" to="/bookings">My Bookings</NavLink>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-blue-300 text-white shadow-md w-full">
      <div className="navbar w-full px-0">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="p-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-300 rounded-box w-52">
              {commonLinks}
              {user ? userLinks : guestLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center pl-2 text-black">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full mr-1" />
            <span className='font-semibold text-2xl'>CarZone</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 flex gap-4">
            {commonLinks}
            {user ? userLinks : guestLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center space-x-3 pr-2">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-white text-black font-semibold"
              >
                Sign out
              </button>
              <img
                src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                alt="Profile"
                title={user.displayName || 'User'}
                className="w-10 h-10 rounded-full object-cover"
              />
            </>
          ) : (
            <Link
              to="/signup"
              className="px-4 py-2 rounded bg-white text-black font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
