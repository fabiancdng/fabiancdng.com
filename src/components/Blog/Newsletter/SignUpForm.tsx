const SignUpForm = () => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-start sm:items-start mt-5 z-1">
      <input
        className="w-full sm:w-96 px-5 py-3 text-lg text-gray-800 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="email"
        placeholder="Enter your email"
        disabled
      />
      <button
        disabled
        className="w-full sm:w-auto px-5 py-3 mt-5 sm:mt-0 sm:ml-5 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Subscribe
      </button>
    </div>
  );
};

export default SignUpForm;
