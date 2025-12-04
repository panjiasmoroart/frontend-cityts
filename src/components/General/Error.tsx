// import type
import type { FC } from "react";

// import icon
import { FiAlertCircle } from "react-icons/fi";

const Error: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-2xl shadow">
      <FiAlertCircle className="text-red-500 mb-3" size={24} />
      <p className="text-red-600 font-medium mb-2">Failed to Load Data</p>
      <p className="text-gray-600 text-sm text-center max-w-md">
        An error occurred while loading data. Please try again.
      </p>
    </div>
  );
};

export default Error;
