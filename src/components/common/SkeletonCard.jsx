const SkeletonCard = () => (
    <div className="bg-white grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-8 animate-pulse">
        {
            Array.from({ length: 9 }).map((_,i) => <div key={i} className="flex space-x-4">
                {/* Left Side Skeleton */}
                <div className="w-1/4 flex flex-col items-center space-y-3">
                    {/* <div className="w-16 h-6 bg-gray-300 rounded"></div> */}
                    <div className="w-full h-full bg-gray-300 rounded-lg"></div>
                </div>

                {/* Right Side Skeleton */}
                <div className="w-3/4 flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                            <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            <div className="w-24 h-4 bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-10 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>)
        }

    </div>
);

export default SkeletonCard;