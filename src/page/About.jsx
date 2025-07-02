import React from 'react';
import { FaCar, FaMapMarkedAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">About CarZone</h2>

      <div className="space-y-10 max-w-4xl mx-auto text-gray-700 text-lg">
        <p>
          At <span className="font-semibold">CarZone</span>, we’re dedicated to providing the best car rental experience in Bangladesh. Whether you need a car for business, travel, or a weekend getaway, we offer a wide range of vehicles to suit your needs.
        </p>

        <p>
          Our mission is to make car rentals easy, affordable, and hassle-free. With a seamless online booking system and a fleet of well-maintained vehicles, you can trust CarZone to get you where you need to go.
        </p>

        <p>
          Customer satisfaction is at the heart of what we do. Our friendly support team is always ready to help you choose the perfect car and provide any assistance you need along the way.
        </p>

        <p>
          Join thousands of happy customers who trust CarZone for their transportation needs. Explore our available cars, book your ride, and enjoy the freedom of the road with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div className="flex items-start space-x-4">
            <FaCar className="text-blue-600 text-3xl mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-1">Wide Vehicle Selection</h3>
              <p>
                Choose from a diverse fleet including sedans, SUVs, luxury cars, and economy models. Whatever your style or budget, CarZone has you covered.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaMapMarkedAlt className="text-blue-600 text-3xl mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-1">Nationwide Coverage</h3>
              <p>
                Our service covers major cities and popular tourist destinations throughout Bangladesh, ensuring convenient pick-up and drop-off locations.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaUsers className="text-blue-600 text-3xl mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-1">Customer First Approach</h3>
              <p>
                We prioritize your needs with 24/7 customer support and flexible rental policies designed for your convenience.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <FaShieldAlt className="text-blue-600 text-3xl mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-1">Safety & Maintenance</h3>
              <p>
                Every vehicle undergoes rigorous inspections and maintenance to guarantee your safety and peace of mind on the road.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
