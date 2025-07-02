import React, { useEffect, useState } from 'react'
import banner from '../../assets/banner.jpg'
import './Home.css'
import { Link, useLoaderData } from 'react-router'
import { motion } from 'framer-motion';

function getRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.round((now - date) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'today' : `${diff} day(s) ago`;
}
const steps = [
  {
    icon: '🔍',
    title: 'Browse Cars',
    desc: 'Explore a wide range of vehicles suited for every journey.',
  },
  {
    icon: '📝',
    title: 'Book Online',
    desc: 'Select your car, dates, and book instantly with easy steps.',
  },
  {
    icon: '🚗',
    title: 'Drive & Enjoy',
    desc: 'Pick up your car and hit the road—simple and stress-free!',
  },
];
const blogs = [
  {
    title: "Tips for Renting Cars",
    description:
      "Learn how to rent cars safely and affordably with these expert tips.",
  },
  {
    title: "Best Cars for Long Trips",
    description:
      "Planning a road trip? Check out our top picks for long-distance travel.",
  },
  {
    title: "Driving in Different Cities",
    description:
      "What to expect when renting and driving cars in unfamiliar cities.",
  },
];

function Home() {
  const cars = useLoaderData();

  return (
    <>
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(/banner.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-75   bg-opacity-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold mb-6 text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5); text-red-600">Drive Your Dreams Today!</h1>
          <a href="/available" className="bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold px-6 py-3 rounded shadow-lg transition">
            View Available Cars
          </a>
        </div>
      </section>

      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: '🚗', title: 'Wide Variety of Cars', desc: 'From budget to luxury.' },
            { icon: '💰', title: 'Affordable Prices', desc: 'Competitive daily rates.' },
            { icon: '⚡', title: 'Easy Booking', desc: 'Book in just a few clicks.' },
            { icon: '📞', title: '24/7 Support', desc: 'We’re here when you need us.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

<section className="py-16 px-4 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-10">Recent Listings</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {cars
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6) 
      .map((car) => {
        const daysAgo = Math.floor((new Date() - new Date(car.createdAt)) / (1000 * 60 * 60 * 24));
        const postedDate = daysAgo === 0 ? "Today" : `Added ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;

        return (
          <div
            key={car._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-[1.02] duration-300"
          >
            <div className="overflow-hidden h-40">
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{car.carModel}</h3>
              <p className="text-gray-700 mb-1">${car.dailyRentalPrice} / day</p>
              <p className="text-sm text-gray-600 mb-1">Bookings: {car.bookingCount || 0}</p>
              <p className="text-sm text-gray-500 mb-2">{postedDate}</p>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  car.bookingStatus
=== 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {car.bookingStatus
 || 'Unavailable'}
              </span>
              {/* Uncomment if you want booking button */}
              {/* <Link to={`/car/${car._id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Book Now
                </button>
              </Link> */}
            </div>
          </div>
        );
      })}
  </div>
</section>

   <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Car Rental Tips
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Discover useful advice, expert insights, and guides to make your car
          rental experience better.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-left border border-blue-100 hover:shadow-xl transition-transform hover:scale-[1.02]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {blog.description}
              </p>
              <button className="mt-4 text-sm text-blue-600 hover:underline">
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      
  <section className="py-20 bg-gray-50">
  <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center px-4">
    {steps.map((step, idx) => (
      <motion.div
        key={idx}
        className="bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: idx * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-5xl mb-4">{step.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-gray-600">{step.desc}</p>
      </motion.div>
    ))}
  </div>
</section>


      <section className="py-16 bg-gradient-to-r from-yellow-100 via-white to-yellow-100">
        <h2 className="text-4xl font-bold text-center mb-12">Special Offers</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { text: 'Get 15% off for weekend rentals!', btn: 'Book Now' },
            { text: 'Luxury cars at $99/day this holiday season!', btn: 'Learn More' },
          ].map((offer, idx) => (
            <div key={idx} className="w-[300px] bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
              <p className="text-lg font-semibold text-center mb-4">{offer.text}</p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                {offer.btn}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
