import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router'
import { vlalueContext } from '../Layout/Homelayout';
import { toast } from 'react-toastify';

function UpdateCar() {
    const data = useLoaderData();
    const {user}= useContext(vlalueContext)
    const navigate = useNavigate(); 
    console.log("data is",data)
    console.log("update",user.email);
  
    const{availability,

carModel,
dailyRentalPrice,
description,
email,
features,
imageUrl,
location,

bookingStatus,

registrationNumber,
_id
}=data
console.log("car model:",carModel);
    const handleSubmit= async(e)=>{
        e.preventDefault();
                    const form= e.target;
            const formData= new FormData(form)
            const clientData= Object.fromEntries(formData.entries())
            console.log('update data',clientData)

                  await fetch(`https://car-rental-azure-zeta.vercel.app/update/${_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clientData),
                  })
                  .then((res)=>res.json())
                  .then(data=>{
                         if (data.modifiedCount) {
              toast.success("Data updated Successfully");
             navigate(`/cars/${user?.email}`); // ✅ redirect here
            }   
            
            //console.log(data)
                  })
                 
    }
  return (
  <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Update Car Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="carModel"
          placeholder="Car Model"
           defaultValue={carModel}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="dailyRentalPrice"
          placeholder="Daily Rental Price"
        defaultValue={dailyRentalPrice}
          required
          className="w-full border p-2 rounded"
        />

          <label htmlFor="bookingStatus" className="block font-medium mb-1">
    Booking Status
  </label>
  <select
    name="bookingStatus"
    id="bookingStatus"
    required
    defaultValue={
bookingStatus
}
    className="w-full border p-2 rounded"
  >
    <option value="">-- Select Status --</option>
    <option value="available">Available</option>
    <option value="unavailable">Unavailable</option>
  </select>

        <input
          type="text"
          name="registrationNumber"
          placeholder="Vehicle Registration Number"
       defaultValue={registrationNumber}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="features"
          placeholder="Features (comma-separated, e.g., GPS, AC)"
         defaultValue={features}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
     defaultValue={description}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
         defaultValue={imageUrl}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
       defaultValue={location}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="email"
          placeholder="Location"
          readOnly
defaultValue={email}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Car
        </button>
      </form>
    </div>
  )
}

export default UpdateCar
