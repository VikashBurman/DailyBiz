// ShimmerPostPage.js
const ShimmerPostPage = () => {
    return (
      <div className="animate-pulse p-5 sm:p-8 md:p-12 flex flex-col justify-center items-center">
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 w-full bg-gray-300 rounded mb-6"></div>
        <div className="space-y-4 max-w-4xl w-full">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerPostPage;
  