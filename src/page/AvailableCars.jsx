import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router';
import { FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';

function AvailableCars() {
  const data = useLoaderData();

  const [originalCars, setOriginalCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const parsedCars = data.map((car) => ({
      ...car,
      createdAt: new Date(car.createdAt),
    }));
    setOriginalCars(parsedCars);
    setCars(parsedCars);
  }, [data]);

  useEffect(() => {
    let filtered = [...originalCars];

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (car) =>
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

  function formatDhakaTime(date) {
    const dhakaOffset = 6 * 60;
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const dhakaTime = new Date(utc + dhakaOffset * 60000);
    return dhakaTime.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  return (
    <div className="p-4">
      <Helmet>
        <title>AvailableCar | CarZone</title>
        <meta name="description" content="Browse available cars for rent" />
      </Helmet>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by model, brand, or location..."
            className="border rounded-lg pl-10 pr-10 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <FiX
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
            />
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center w-full md:w-auto">
          {/* Sort Dropdown */}
          <select
            className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition w-full sm:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dateDesc">Date Added: Newest First</option>
            <option value="dateAsc">Date Added: Oldest First</option>
            <option value="priceAsc">Price: Lowest First</option>
            <option value="priceDesc">Price: Highest First</option>
          </select>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto justify-center"
          >
            {viewMode === 'grid' ? (
              <>
                <FiList /> List View
              </>
            ) : (
              <>
                <FiGrid /> Grid View
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cars List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="border rounded-lg shadow-md flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-t-lg bg-white">
                <img
                  src={car.imageUrl}
                  alt={car.carModel}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col gap-2 p-4 flex-grow">
                <h2 className="text-xl font-semibold">{car.carModel}</h2>
                <p className="text-gray-600">
                  Price: ${car.dailyRentalPrice}/day
                </p>
                <p className="text-sm text-gray-400">
                  Added: {formatDhakaTime(car.createdAt)}
                </p>
                <p className="text-sm text-gray-400">Features: {car.features}</p>
                <p>
                  <strong>Availability:</strong> {car.bookingStatus}
                </p>
                <p>
                  <strong>BookingCount:</strong> {car.bookingCount}
                </p>
                <p>
                  <strong>Location:</strong> {car.location}
                </p>
                <div className="mt-auto">
                  <Link to={`/car/${car._id}`}>
                    <button className="mt-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition w-full">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="hero bg-base-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300"
            >
              <div className="hero-content flex-col lg:flex-row justify-between gap-8 w-full p-6">
                {/* Image */}
                <div className="flex-shrink-0 w-full lg:w-1/3 overflow-hidden rounded-lg">
                  <img
                    src={car.imageUrl}
                    alt={car.carModel}
                    className="w-full h-64 object-cover rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between w-full lg:w-2/3">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                      {car.carModel}
                    </h2>
                    <p className="text-lg text-gray-700 mb-2">
                      <strong>Price:</strong> ${car.dailyRentalPrice}/day
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Added:</strong> {formatDhakaTime(car.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Features:</strong> {car.features}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Availability:</strong> {car.bookingStatus}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Booking Count:</strong> {car.bookingCount}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      <strong>Location:</strong> {car.location}
                    </p>
                  </div>

                  {/* Button */}
                  <div>
                    <Link to={`/car/${car._id}`}>
                      <button className="btn btn-primary w-full lg:w-auto transition-transform transform hover:scale-105">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cars.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No cars found matching your search.
        </p>
      )}
    </div>
  );
}

export default AvailableCars;
