import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaQuestionCircle, FaCarSide, FaCalendarAlt, FaDollarSign, FaIdCard, FaRoad } from 'react-icons/fa';

export const faqData = [
  {
    id: 1,
    icon: <FaQuestionCircle className="text-blue-600 mr-3" />,
    question: "What documents do I need to rent a car?",
    answer:
      "You typically need a valid driver's license, a credit card, and a government-issued ID or passport. Some rentals may require additional documents depending on your location and the vehicle.",
  },
  {
    id: 2,
    icon: <FaCarSide className="text-blue-600 mr-3" />,
    question: "Can I rent a car without a credit card?",
    answer:
      "Most rental agencies require a credit card for security reasons. However, some accept debit cards with additional verification. Check the specific rental policy before booking.",
  },
  {
    id: 3,
    icon: <FaCalendarAlt className="text-blue-600 mr-3" />,
    question: "What is the minimum age to rent a car?",
    answer:
      "The minimum age is usually 21 years old. Some companies may have higher age requirements or charge a young driver fee for drivers under 25.",
  },
  {
    id: 4,
    icon: <FaDollarSign className="text-blue-600 mr-3" />,
    question: "Are there any hidden fees in the rental price?",
    answer:
      "No, our pricing is transparent. The total cost includes the rental fee, taxes, and any mandatory insurance. Optional extras like GPS or child seats are charged separately.",
  },
  {
    id: 5,
    icon: <FaIdCard className="text-blue-600 mr-3" />,
    question: "Can I add an additional driver?",
    answer:
      "Yes, additional drivers can be added to your rental agreement. Usually, there is an extra daily fee, and the additional driver must meet the same requirements as the primary renter.",
  },
  {
    id: 6,
    icon: <FaRoad className="text-blue-600 mr-3" />,
    question: "Can I drive the rental car outside the city or country?",
    answer:
      "Driving outside the city is generally allowed, but cross-country travel may require prior approval. Please inform us about your travel plans to ensure compliance with rental policies.",
  },
];

const FAQ = () => {
  return (
    <section className="max-w-4xl mx-auto p-6">
           <Helmet>
                    <title>FAQ | CarZone</title>
                    <meta name="description" content="Welcome to the homepage of My App" />
                  </Helmet>
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqData.map(({ id, icon, question, answer }) => (
          <div key={id} className="flex items-start space-x-4">
            <div>{icon}</div>
            <div>
              <h3 className="font-semibold text-xl mb-1">{question}</h3>
              <p className="text-gray-700">{answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
