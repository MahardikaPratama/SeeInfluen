import React from "react";

function PricingCard({ plan, price, features }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{plan}</h2>
      <p className="text-5xl font-bold text-gray-800 mt-4">${price}</p>
      <p className="text-gray-600">Per user, per month</p>
      <ul className="text-gray-600 mt-6">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-fit mt-4">
        Pesan
      </button>
    </div>
  );
}

export default React.memo(PricingCard);
