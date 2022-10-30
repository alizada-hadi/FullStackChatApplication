import React from "react";
import image from '../image/chat.png'
const Home = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between">
        <div>
        <h1 className="text-5xl mt-10 font-Inter">Welcome to Easy Chat</h1>
        <p className="mt-5 text-xl font-Inter">We simplify the way you <span className="text-amber-300">communicate</span> with your friends<sup className="text-3xl">💑</sup></p>
        </div>

        <img src={image} className="w-96 h-96" alt="" />
      </div>
    </div>
  );
};

export default Home;
