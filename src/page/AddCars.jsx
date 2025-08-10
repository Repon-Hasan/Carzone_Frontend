import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { vlalueContext } from '../Layout/Homelayout';
import { Helmet } from 'react-helmet-async';

function AddCars() {
  const { user } = useContext(vlalueContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCar = Object.fromEntries(formData.entries());
    console.log(newCar);

    fetch('https://car-rental-azure-zeta.vercel.app/addCars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server Error: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.insertedId) {
          toast.success('Data added successfully');
          e.target.reset();
        }
      })
      .catch((err) => {
        console.error('Failed to submit form:', err);
        toast.error('Something went wrong!');
      });
  };

  return (
    
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
      <Helmet>
              <title>AddCar | CarZone</title>
              <meta name="description" content="Welcome to the homepage of My App" />
            </Helmet>
      <h2 className="text-2xl font-bold mb-4">Add a New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="carModel" placeholder="Car Model" required className="w-full border p-2 rounded" />
        <input type="number" name="dailyRentalPrice" placeholder="Daily Rental Price" required className="w-full border p-2 rounded" />

        <label htmlFor="bookingStatus" className="block font-medium mb-1">Booking Status</label>
        <select name="bookingStatus" id="bookingStatus" required className="w-full border p-2 rounded">
          <option value="">-- Select Status --</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <input type="text" name="registrationNumber" placeholder="Vehicle Registration Number" required className="w-full border p-2 rounded" />
        <input type="text" name="features" placeholder="Features (comma-separated)" className="w-full border p-2 rounded" />
        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" />
        <input type="text" name="imageUrl" placeholder="Image URL" className="w-full border p-2 rounded" />
        <input type="text" name="location" placeholder="Location" required className="w-full border p-2 rounded" />
        <input type="text" name="email" placeholder="Email" readOnly value={user?.email || ''} required className="w-full border p-2 rounded" />
        <input type="text" name="name" placeholder="Name" readOnly value={user?.displayName || ''} required className="w-full border p-2 rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AddCars;
