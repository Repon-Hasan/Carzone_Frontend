import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router';

function AvailableCars() {
  const data = useLoaderData();
  console.log(data)

  const [originalCars, setOriginalCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [searchTerm, setSearchTerm] = useState('');

  // Parse date string to Date object on initial load
  useEffect(() => {
    const parsedCars = data.map(car => ({
      ...car,
      createdAt: new Date(car.createdAt)
    }));
    setOriginalCars(parsedCars);
    setCars(parsedCars);
  }, [data]);

  // Apply filtering and sorting
  useEffect(() => {
    let filtered = [...originalCars];

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((car) =>
        car.carModel?.toLowerCase().includes(term) ||
        car.brand?.toLowerCase().includes(term) ||
        car.location?.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'dateDesc') {
      filtered.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortBy === 'dateAsc') {
      filtered.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sortBy === 'priceAsc') {
      filtered.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (sortBy === 'priceDesc') {
      filtered.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }

    setCars(filtered);
  }, [searchTerm, sortBy, originalCars]);

  // Format date to Asia/Dhaka time
  function formatDhakaTime(date) {
    const dhakaOffset = 6 * 60; // in minutes
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const dhakaTime = new Date(utc + dhakaOffset * 60000);
    return dhakaTime.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  return (
    <div className="p-4">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by model, brand, or location"
          className="border rounded px-3 py-1 w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div>
            <label className="mr-2 font-semibold">Sort By:</label>
            <select
              className="border rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dateDesc">Date Added: Newest First</option>
              <option value="dateAsc">Date Added: Oldest First</option>
              <option value="priceAsc">Price: Lowest First</option>
              <option value="priceDesc">Price: Highest First</option>
            </select>
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Car List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
            : 'flex flex-col gap-4'
        }
      >
        {cars.map((car) => (
          <div
            key={car._id}
            className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center"
          >
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="w-full md:w-40 h-32 object-cover rounded-md"
            />
            <div className="flex flex-col gap-2 p-4 w-full">
              <h2 className="text-xl font-semibold">{car.carModel}</h2>
              <p className="text-gray-600">Price: ${car.dailyRentalPrice}/day</p>
              <p className="text-sm text-gray-400">
                Added: {formatDhakaTime(car.createdAt)}
              </p>
              <p className="text-sm text-gray-400">
                
 Features: {car.features }   

              </p>
                  <p className="mb-2">
        <strong>Availability:</strong> {car.bookingStatus}

      </p>
                  <p className="mb-2">
        <strong>BookingCount:</strong> {car.
bookingCount}

      </p>
                  <p className="mb-2">
        <strong>Location:</strong> {car.

location}

      </p>
              <Link to={`/car/${car._id}`}>
                <button className="mt-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
        {cars.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No cars found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default AvailableCars;
