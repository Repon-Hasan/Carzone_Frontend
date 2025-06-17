import React, { useState, useContext } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { vlalueContext } from '../Layout/Homelayout';

function CarDetails() {
  const car = useLoaderData();
  const { user } = useContext(vlalueContext);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;
    const basePrice = days * car.dailyRentalPrice;
    const tax = basePrice * 0.1;
    return (basePrice + tax).toFixed(2);
  };

  const handleBook = () => {
    if (!startDate || !endDate) {
      return Swal.fire('Error', 'Please select start and end date.', 'error');
    }

    const totalPrice = calculateTotalPrice();

    const bookingData = {
      carId: car._id,
      carModel: car.carModel,
      imageUrl: car.imageUrl,
      location: car.location,
      dailyRentalPrice: car.dailyRentalPrice,
      startDate,
      endDate,
      bookingDate: new Date().toISOString(),
      totalPrice: parseFloat(totalPrice),
     bookingStatus: 'Confirmed',
      email: user?.email || 'guest@example.com',
    };

    fetch('https://car-rental-azure-zeta.vercel.app/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then(res => res.json())
      .then(() => {
        setShowModal(false);
        Swal.fire('Booking Confirmed', `You booked ${car.carModel}`, 'success');
        setStartDate('');
        setEndDate('');
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Booking Failed', 'Try again later.', 'error');
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={car.imageUrl} alt={car.carModel} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{car.carModel}</h1>
      <p className="text-gray-600 mb-2">Price: ${car.dailyRentalPrice}/day</p>
      <p className="mb-2"><strong>Availability:</strong> {car.bookingStatus}</p>
      <p className="mb-6"><strong>Description:</strong> {car.description}</p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Book Now
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
            <img src={car.imageUrl} alt={car.carModel} className="w-full h-64 object-cover rounded-lg mb-4" />

            <p><strong>Model:</strong> {car.carModel}</p>
            <p><strong>Price/Day:</strong> ${car.dailyRentalPrice}</p>
            <p><strong>Location:</strong> {car.location}</p>

            <div className="my-4">
              <label className="block mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <label className="block mt-4 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <p className="text-lg font-semibold mt-4">
              Total Price: ${calculateTotalPrice()}
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetails;
