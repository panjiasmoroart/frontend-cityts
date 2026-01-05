// import React and hooks
import React, { useState, type FormEvent } from "react";

// import icons
import { FiSave } from "react-icons/fi";

// import toast
import { toast } from "react-hot-toast";

// import useSliderCreate hook
import { useSliderCreate } from "../../../hooks/admin/slider/useSliderCreate";

//import query client TanStack Query
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// interface error
interface ValidationErrors {
  [key: string]: string;
}

const SliderCreate: React.FC = () => {
  //initialize useQueryClient
  const queryClient = useQueryClient();

  // state form
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  // state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // inisialisasi hook create slider
  const { mutate, isPending } = useSliderCreate();

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //panggil mutate untuk mengirim data
    mutate(
      {
        image,
        description,
      },
      {
        onSuccess: () => {
          // notifikasi sukses
          toast.success("Slider uploaded successfully!", {
            position: "top-right",
            duration: 3000,
          });

          // Setelah berhasil upload, invalidate query untuk memperbarui data
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "sliders",
          });

          // Reset form
          setImage(null);
          setDescription("");
          setErrors({});
        },

        onError: (error: AxiosError<ApiErrorResponse>) => {
          // Set error jika ada validasi dari backend
          setErrors(error.response?.data?.errors || {});
        },
      }
    );
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Upload Slider</h1>
        <p className="text-sm text-gray-500 mt-1 italic">
          Fill in the form to upload a new slider image.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.Image && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded-xl">
                {errors.Image}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description for this slider..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
            />
            {errors.Description && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded-xl">
                {errors.Description}
              </div>
            )}
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 flex items-center bg-linear-to-br from-yellow-800 to-yellow-400 text-white rounded-xl hover:from-yellow-900 hover:to-yellow-500 transition duration-200"
            >
              <FiSave className="mr-2" size={18} />
              {isPending ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SliderCreate;
