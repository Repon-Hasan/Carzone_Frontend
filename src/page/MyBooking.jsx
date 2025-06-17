import React, { useEffect, useState, useContext } from 'react';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { vlalueContext } from '../Layout/Homelayout';

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(vlalueContext);

  const fetchBookings = () => {
    fetch(`https://car-rental-azure-zeta.vercel.app/bookings?email=${user?.email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log('Fetched bookings:', data);
        setBookings(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setBookings([]);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://car-rental-azure-zeta.vercel.app/bookings/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ bookingStatus: 'Canceled' }),
        })
          .then(res => res.json())
          .then(() => {
            fetchBookings();
            Swal.fire('Canceled!', '', 'success');
          });
      }
    });
  };

  const handleModify = (booking) => {
    Swal.fire({
      title: 'Modify Booking Dates',
      html: `
        <label>Start Date: <input type="date" id="start-date" class="swal2-input" value="${booking.startDate?.slice(0, 10) || ''}"></label>
        <br/>
        <label>End Date: <input type="date" id="end-date" class="swal2-input" value="${booking.endDate?.slice(0, 10) || ''}"></label>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      preConfirm: () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        if (!startDate || !endDate) {
          Swal.showValidationMessage('Please select both dates.');
          return false;
        }
        return { startDate, endDate };
      },
    }).then(result => {
      if (result.isConfirmed) {
        const { startDate, endDate } = result.value;
        fetch(`https://car-rental-azure-zeta.vercel.app/bookings/${booking._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            startDate,
            endDate,
            bookingDate: startDate,
            bookingStatus: 'Confirmed',
          }),
        })
          .then(res => res.json())
          .then(() => {
            fetchBookings();
            Swal.fire('Updated!', '', 'success');
          });
      }
    });
  };

  const calculateTotalPrice = (start, end, pricePerDay) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
    const basePrice = durationDays * pricePerDay;
    const tax = basePrice * 0.1;
    return (basePrice + tax).toFixed(2);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      {!Array.isArray(bookings) ? (
        <p className="text-red-500">Error: Invalid booking data received.</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="min-w-full text-sm table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 font-bold">Car Image</th>
              <th className="p-2 font-bold">Car Model</th>
              <th className="p-2 font-bold">Booking Date</th>
              <th className="p-2 font-bold">Start Date</th>
              <th className="p-2 font-bold">End Date</th>
              <th className="p-2 font-bold">Total Price</th>
              <th className="p-2 font-bold">Status</th>
              <th className="p-2 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50 border-b">
                <td className="p-2">
                  <img src={booking.imageUrl} alt="car" className="w-16 h-10 object-cover rounded" />
                </td>
                <td className="p-2">{booking.carModel}</td>
                <td className="p-2">{new Date(booking.bookingDate).toLocaleString('en-GB')}</td>
                <td className="p-2">{new Date(booking.startDate).toLocaleDateString('en-GB')}</td>
                <td className="p-2">{new Date(booking.endDate).toLocaleDateString('en-GB')}</td>
                <td className="p-2">
                  ${calculateTotalPrice(booking.startDate, booking.endDate, booking.dailyRentalPrice)}
                </td>
                <td className="p-2 font-medium">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      booking.bookingStatus === 'Confirmed'
                        ? 'bg-green-500'
                        : booking.bookingStatus === 'Pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => handleModify(booking)}
                  >
                    <FaCalendarAlt /> Modify Date
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => handleCancel(booking._id)}
                  >
                    <FaTrash /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBooking;
