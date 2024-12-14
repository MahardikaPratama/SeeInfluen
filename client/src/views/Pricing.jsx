import React, { useState } from "react";
import Navigation from "../components/Navigation";
import PricingCard from "../components/PricingCard";
import Footer from "../components/Footer";

function Pricing() {
  const [pricing, setPricing] = useState("monthly");

  return (
    <>
      <Navigation />
      <section className="">
        <h1 className="text-4xl font-bold text-center h-96 flex flex-col justify-center items-center bg-[#f5f5f5]">
          Coba 1 Bulan gratis
        </h1>
      </section>
      <section className="px-4 py-8">
        <div className="flex flex-row justify-center items-center gap-8">
          <span
            className={`font-bold py-2 px-4 rounded cursor-pointer ${
              pricing === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => setPricing("monthly")}
          >
            Monthly
          </span>
          <span
            className={`font-bold py-2 px-4 rounded cursor-pointer ${
              pricing === "yearly"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => setPricing("yearly")}
          >
            Yearly
          </span>
        </div>
        <div className="flex flex-row justify-center items-center gap-32 mt-8">
          <PricingCard
            plan={"Newbie"}
            price={pricing === "monthly" ? 10 : 110}
            features={[
              "Realtime dashboard",
              "Best time recomendation",
              "Compare account",
            ]}
          />
          <PricingCard
            plan={"Annual"}
            price={pricing === "monthly" ? 65 : 650}
            features={[
              "Realtime dashboard",
              "Best time recomendation",
              "Compare account",
              "Analysis sentiment",
            ]}
          />
          <PricingCard
            plan={"Pro"}
            price={pricing === "monthly" ? 70 : 700}
            features={[
              "Realtime dashboard",
              "Best time recomendation",
              "Compare account",
              "Analysis sentiment",
            ]}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default React.memo(Pricing);
