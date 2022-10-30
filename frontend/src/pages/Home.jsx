import React from "react";
import image from '../image/chat.png'
const Home = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl ">Home</h1>
        <img src={image} className="w-96 h-96" alt="" />
      </div>
    </div>
  );
};

export default Home;
