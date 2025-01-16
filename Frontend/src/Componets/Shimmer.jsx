const Shimmer = () => {
  return (
    <div className="mx-auto md:max-w-[58rem] px-4 py-10 sm:px-6 lg:px-4 lg:py-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl animate-pulse">
      <div className="flex flex-col gap-6 border-gray-300 sm:p-2">
        <div className="group flex flex-col rounded-xl focus:outline-none sm:flex-row">
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-xl bg-gray-200 sm:h-[250px] sm:w-[350px]"></div>
          <div className="flex grow flex-col p-4 sm:p-6 max-sm:p-1">
            <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded-md mb-6"></div>
            <div className="flex items-center">
              <div className="h-5 w-1/3 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded-md ml-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
