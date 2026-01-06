//import React and hooks
import React, { useEffect, useState, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate
import { useNavigate } from "react-router";

// import useAparaturCreate hook
import { useAparaturCreate } from "../../../hooks/admin/aparatur/useAparaturCreate";

//import react Quill
import ReactQuill from "react-quill-new";

// quill CSS
import "react-quill-new/dist/quill.snow.css";

// toast
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// interface error
interface ValidationErrors {
  [key: string]: string;
}

const AparaturCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create Aparatur - City Santri Kab. Depok";
  }, []);

  // useNavigate
  const navigate = useNavigate();

  //state form
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Inisialisasi useAparaturCreate hook
  const { mutate, isPending } = useAparaturCreate();

  //function untuk handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // panggil mutate dari useAparaturCreate
    mutate(
      {
        image,
        name,
        position,
        description,
      },
      {
        onSuccess: () => {
          // Redirect setelah berhasil
          navigate("/admin/aparaturs");

          // Notifikasi sukses
          toast.success("Aparatur created successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // Set error dari server jika ada
          setErrors(error.response?.data?.errors || {});
        },
      }
    );
  };

  return (
    <AdminLayout>
      <div className="p-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Create Aparatur
            </h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to add new aparatur (staff/member).
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Input Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                placeholder="image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Image && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Image}</span>
              </div>
            )}

            {/* Input Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Name && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Name}</span>
              </div>
            )}

            {/* Input Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Position && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Position}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Description"
                value={description}
                onChange={(description) => setDescription(description)}
                style={{ height: "200px", paddingBottom: "40px" }}
              />
            </div>
            {errors.Description && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Description}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-start">
              <button
                type="button"
                className="px-4 py-2 flex items-center bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200 mr-2"
                onClick={() => window.history.back()}
              >
                <FiArrowLeft className="mr-2" size={18} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 flex items-center bg-linear-to-br from-yellow-800 to-yellow-400 text-white rounded-xl hover:bg-yellow-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" size={18} />
                {isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AparaturCreate;
