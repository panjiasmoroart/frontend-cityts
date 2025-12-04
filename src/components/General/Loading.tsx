// import type
import type { FC } from "react";

// import icon
import { FiLoader } from "react-icons/fi";

const Loading: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FiLoader className="animate-spin text-yellow-500 mb-3" size={24} />
      <p className="text-gray-600">Loading Data...</p>
    </div>
  );
};

export default Loading;
