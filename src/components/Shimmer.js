const Shimmer = () => {
  return (
    <div className="flex gap-4 flex-wrap justify-center bg-black bg-opacity-90 h-[80vh] mx-3">
      {[...Array(24)].map((_, index) => (
        <div
          key={index}
          className="w-36 md:w-48 h-48 md:h-64 relative mt-[60px] mx-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          <div className="absolute inset-0 w-1/3 bg-white opacity-25"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
