import React from "react";
import Navigation from "../components/Navigation";
import TestimoniCard from "../components/TestimoniCard";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <Navigation />
      <section className="flex flex-col h-screen bg-hero-background">
        <div className="flex flex-col items-start justify-center flex-grow p-32 gap-4">
          <h1 className="text-5xl font-bold text-white">
            Optimalkan Performa dan Engagement YouTube Anda
          </h1>
          <p className="text-white text-xl">
            Solusi monitoring untuk memahami audiens dan mengembangkan strategi
            konten yang tepat.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded h-fit mt-4">
            Daftar Sekarang
          </button>
        </div>
      </section>
      <section className="h-screen bg-[#979797] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <img
            src="/src/assets/preview-1.png"
            alt="Preview"
            className="w-full object-contain"
          />
          <p className="font-bold text-5xl text-center">
            Kelola akun YouTube anda dengan mudah
          </p>
          <p className="font-bold text-5xl text-center">
            Memantau Subscriber anda secara Realtime
          </p>
          <img
            src="/src/assets/preview-2.png"
            alt="Preview"
            className="w-5/6 object-contain"
          />
        </div>
      </section>
      <section className="flex flex-col h-[520px] bg-[#F2F2F2] p-16 border-b border-gray-400">
        <h2 className="text-4xl font-bold">Testimoni</h2>
        <h3 className="text-2xl font-normal ">Para influencer ternama</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center h-full">
          <TestimoniCard
            testimoni={
              "Aplikasi ini sangat membantu dalam memonitoring kanal YouTube saya"
            }
            profile={"/src/assets/testimoni-1.png"}
            name={"Angelina"}
            job={"Makeup Artist"}
          />
          <TestimoniCard
            testimoni={
              "Membantu akun kanal Youtube saya menjadi lebih terpantau"
            }
            profile={"/src/assets/testimoni-1.png"}
            name={"Elsa"}
            job={"Gaming"}
          />
          <TestimoniCard
            testimoni={"Pertumbuhan pelanggan Youtube saya jadi semakin pesat"}
            profile={"/src/assets/testimoni-1.png"}
            name={"Putri"}
            job={"Food Vlogger"}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LandingPage;
