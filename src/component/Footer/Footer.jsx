import React from 'react';
import { NavLink } from 'react-router';

function Footer() {
  return (
    <div className="mt-6 rounded-t-xl shadow-inner bg-white">
      <footer className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b pb-8">
          
          {/* Branding */}
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white">
                🚗
              </div>
              <span className="text-xl font-bold text-gray-800">DriveEase</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 font-semibold">
              Rent your dream car easily and affordably. Drive with comfort, anytime and anywhere.
            </p>
          </div>

          {/* Rentals Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Rentals</h3>
            <ul className="space-y-2 text-sm font-semibold text-gray-600">
              <li>
                <NavLink to="/" className="hover:underline">Home</NavLink>
              </li>
              <li>
                <NavLink to="/available" className="hover:underline">Available Cars</NavLink>
              </li>
              <li>
                <NavLink to="/bookings" className="hover:underline">My Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/add-car" className="hover:underline">List Your Car</NavLink>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Operating Hours</h3>
            <ul className="text-sm font-semibold text-gray-600 space-y-1">
              <li>Mon - Fri: 8:00 AM - 8:00 PM</li>
              <li>Sat: 9:00 AM - 6:00 PM</li>
              <li>Sun: Closed</li>
              <li>24/7 Online Booking</li>
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Popular Locations</h3>
            <ul className="text-sm font-semibold text-gray-600 space-y-1">
              <li>Dhaka City Center</li>
              <li>Hazrat Shahjalal Airport</li>
              <li>Chittagong Downtown</li>
              <li>Cox’s Bazar Beach Road</li>
            </ul>
          </div>

        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 text-sm text-gray-600 font-semibold">
          <p className="text-center md:text-left mb-2 md:mb-0">
            © {new Date().getFullYear()} DriveEase. All rights reserved.
          </p>
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/"
              className="hover:text-indigo-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.337v21.326C0 23.4.597 24 1.325 24h11.495V14.706h-3.13v-3.62h3.13V8.413c0-3.1 1.892-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.919.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.62h-3.12V24h6.116c.728 0 1.325-.6 1.325-1.337V1.337C24 .6 23.403 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-indigo-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.839 9.839 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.566-2.005.978-3.127 1.195A4.918 4.918 0 0016.616 3c-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.763.128 1.125C7.728 8.806 4.1 6.884 1.671 3.996a4.902 4.902 0 00-.666 2.475c0 1.707.869 3.213 2.188 4.096A4.903 4.903 0 01.96 9.18v.062a4.925 4.925 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.926 4.926 0 004.6 3.419A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.426-.014-.637A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
          </div>
        </div>

      </footer>
    </div>
  );
}

export default Footer;