import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { vlalueContext } from '../Layout/Homelayout';
import { Link } from 'react-router';

function MyCars() {
  const { user, loading } = useContext(vlalueContext);
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (user?.email) {
      fetch(`https://car-rental-azure-zeta.vercel.app/cars/${user.email}`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          console.log("Fetched cars:", data);
          if (Array.isArray(data)) {
            setCars(data);
          } else {
            console.error('Expected array but got:', typeof data);
            setCars([]);
          }
        })
        .catch(err => {
          console.error('Error fetching cars:', err);
          setCars([]);
        });
    }
  }, [user?.email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://car-rental-azure-zeta.vercel.app/cars/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your car has been deleted.", "success");
              setCars(prev => prev.filter(car => car._id !== _id));
            }
          });
      }
    });
  };

  const filteredCars = cars.filter(car =>
    car.carModel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOption === 'priceLowHigh') return a.dailyRentalPrice - b.dailyRentalPrice;
    if (sortOption === 'priceHighLow') return b.dailyRentalPrice - a.dailyRentalPrice;
    if (sortOption === 'dateNewest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === 'dateOldest') return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  if (loading) return <p className="text-center py-10 text-lg">Loading cars...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by model, brand, or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="dateNewest">Date Added (Newest First)</option>
          <option value="dateOldest">Date Added (Oldest First)</option>
          <option value="priceLowHigh">Price (Lowest First)</option>
          <option value="priceHighLow">Price (Highest First)</option>
        </select>
      </div>

      {!Array.isArray(cars) ? (
        <p className="text-red-500 font-medium">Invalid data received. Please refresh or contact support.</p>
      ) : sortedCars.length > 0 ? (
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Car Image</th>
              <th className="p-3 border">Car Model</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Bookings</th>
              <th className="p-3 border">Availability</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Date Added</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCars.map(car => (
              <tr key={car._id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">
                  <img src={car.imageUrl} alt={car.carModel} className="w-24 h-16 object-cover rounded" />
                </td>
                <td className="p-2 border">{car.carModel}</td>
                <td className="p-2 border">${car.dailyRentalPrice}</td>
                <td className="p-2 border">{car.bookingCount}</td>
                <td className="p-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-medium ${
                      car.bookingStatus === 'available' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {car.bookingStatus}
                  </span>
                </td>
                <td className="p-2 border">{car.location}</td>
                <td className="p-2 border">{new Date(car.createdAt).toLocaleDateString()}</td>
                <td className="p-2 border space-x-2">
                  <Link
                    to={`/update/${car._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">My Cars</h2>
          <p className="text-gray-600 text-lg mb-2">You haven’t added any cars yet.</p>
          <Link to="/addCars" className="text-blue-600 hover:underline font-medium">
            Click here to add your first car.
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyCars;
