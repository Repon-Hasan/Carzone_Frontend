import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { vlalueContext } from '../Layout/Homelayout';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalContentVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

const buttonHoverTap = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const imgFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

function CarDetails() {
  const car = useLoaderData();
  const { user } = useContext(vlalueContext);

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [validDates, setValidDates] = useState(false);
  const [loading, setLoading] = useState(false); // For async state during booking

  // Lock scroll when modal open
  useEffect(() => {
    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showModal]);

  // Calculate total price & validate dates
  useEffect(() => {
    if (!startDate || !endDate) {
      setTotalPrice(0);
      setValidDates(false);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      setTotalPrice(0);
      setValidDates(false);
      return;
    }
    const basePrice = days * car.dailyRentalPrice;
    const tax = basePrice * 0.1;
    setTotalPrice(basePrice + tax);
    setValidDates(true);
  }, [startDate, endDate, car.dailyRentalPrice]);

  const handleBook = async () => {
    if (!validDates) {
      return Swal.fire('Invalid Dates', 'Please select valid start and end dates.', 'error');
    }

    setLoading(true);

    const bookingData = {
      carId: car._id,
      carModel: car.carModel,
      imageUrl: car.imageUrl,
      location: car.location,
      dailyRentalPrice: car.dailyRentalPrice,
      startDate,
      endDate,
      bookingDate: new Date().toISOString(),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      bookingStatus: 'Confirmed',
      email: user?.email || 'guest@example.com',
    };

    try {
      const res = await fetch('https://car-rental-azure-zeta.vercel.app/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error('Booking failed');

      setShowModal(false);
      Swal.fire('Booking Confirmed', `You booked ${car.carModel}`, 'success');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      console.error(err);
      Swal.fire('Booking Failed', 'Try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>CarDetails | CarZone</title>
        <meta name="description" content={`Details and booking for ${car.carModel}`} />
      </Helmet>

      <motion.div
        className="p-6 max-w-5xl mx-auto"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Car Image */}
        <motion.div
          className="relative w-full rounded-lg shadow-lg mb-8 overflow-hidden aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9]"
          variants={imgFadeIn}
          initial="initial"
          animate="animate"
        >
          <img
            src={car.imageUrl}
            alt={car.carModel}
            className="object-cover object-center w-full h-full"
            loading="lazy"
          />
        </motion.div>

        {/* Car Info */}
        <motion.div
          className="mb-8 px-2 sm:px-0"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{car.carModel}</h1>
          <p className="text-lg sm:text-xl text-indigo-600 font-semibold mb-2">
            ${car.dailyRentalPrice.toLocaleString()}{' '}
            <span className="text-base font-normal text-gray-600">/ day</span>
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Status:</strong>{' '}
            <span className={car.bookingStatus === 'Available' ? 'text-green-600' : 'text-red-600'}>
              {car.bookingStatus}
            </span>
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">{car.description}</p>
        </motion.div>

        {/* Book Now Button */}
        <motion.button
          onClick={() => setShowModal(true)}
        
          className="inline-block bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-semibold px-6 py-3 rounded-md shadow transition-transform focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          variants={buttonHoverTap}
          whileHover="hover"
          whileTap="tap"
        >
          Book Now
        </motion.button>

        {/* Booking Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
              aria-modal="true"
              role="dialog"
              tabIndex={-1}
              variants={modalBackdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => !loading && setShowModal(false)}
            >
              <motion.div
                className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative overflow-auto max-h-[90vh]"
                onClick={e => e.stopPropagation()}
                variants={modalContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <button
                  onClick={() => !loading && setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
                  aria-label="Close modal"
                  type="button"
                  disabled={loading}
                >
                  &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-900">Confirm Booking</h2>

                {/* Modal Image */}
                <motion.div
                  className="w-full h-48 sm:h-56 overflow-hidden rounded-md mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.2 } }}
                >
                  <img
                    src={car.imageUrl}
                    alt={car.carModel}
                    className="object-cover object-center w-full h-full"
                    loading="lazy"
                  />
                </motion.div>

                {/* Details */}
                <div className="mb-5 text-gray-800 space-y-1 text-sm sm:text-base">
                  <p>
                    <strong>Model:</strong> {car.carModel}
                  </p>
                  <p>
                    <strong>Price per Day:</strong> ${car.dailyRentalPrice.toLocaleString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {car.location}
                  </p>
                </div>

                {/* Date inputs */}
                <form className="space-y-5 text-sm sm:text-base">
                  <div>
                    <label htmlFor="startDate" className="block font-semibold text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min={new Date().toISOString().split('T')[0]}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block font-semibold text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min={startDate || new Date().toISOString().split('T')[0]}
                      disabled={!startDate || loading}
                    />
                  </div>
                </form>

                {/* Total Price */}
                <p className="mt-6 text-lg font-semibold text-indigo-700">
                  Total Price: {validDates ? `$${totalPrice.toFixed(2)}` : '—'}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                  <motion.button
                    onClick={() => !loading && setShowModal(false)}
                    className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="button"
                    disabled={loading}
                    variants={buttonHoverTap}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleBook}
                    disabled={!validDates || loading}
                    className={`px-6 py-2 rounded text-white font-semibold transition-transform
                      ${validDates && !loading
                        ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer focus:ring-4 focus:ring-indigo-400'
                        : 'bg-indigo-300 cursor-not-allowed'}
                    `}
                    type="button"
                    variants={buttonHoverTap}
                    whileHover={validDates && !loading ? 'hover' : ''}
                    whileTap={validDates && !loading ? 'tap' : ''}
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default CarDetails;
