import React from 'react';

const NotFound = () => {
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex sm:flex-row flex-col space-x-4 items-center text-red-700">
        <h1 className="text-7xl font-bold text-red">404</h1>
        <span className="text-6xl hidden sm:block font-semibold text-gray-800"> | </span>
        <h2 className="text-3xl font-semibold text-gray-800">Not Found.</h2>
      </div>
    </main>
  );
};

export default NotFound;
