//import React dari 'react';
import React, { useState, useEffect, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

//import useNavigate and useParams from react-router
import { useNavigate, useParams } from "react-router";

//import useCategoryById hook
import { useCategoryById } from "../../../hooks/admin/category/useCategoryById";

//import useCategoryUpdate hook
import { useCategoryUpdate } from "../../../hooks/admin/category/useCategoryUpdate";

// import toast from react-hot-toast
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

const CategoryEdit: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Edit Category - City Santri Kab. Depok";
  }, []);

  //hook useNavigate
  const navigate = useNavigate();

  //initialize useParams
  const { id } = useParams();

  //state untuk menyimpan data kategori
  const [name, setName] = useState<string>("");

  //state untuk menyimpan error validasi
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Inisialisasi useCategoryById hook
  const { data: category } = useCategoryById(Number(id));

  //set data category to state
  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  // Inisialisasi useCategoryUpdate hook
  const { mutate, isPending } = useCategoryUpdate();

  //function untuk handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        id: Number(id),
        name,
      },
      {
        onSuccess: () => {
          // Redirect ke halaman kategori setelah berhasil
          navigate("/admin/categories");

          // notifikasi sukses
          toast.success("Category updated successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          //assign error to variable
          setErrors(error.response?.data?.errors || {});
        },
      }
    );
  };

  return (
    <AdminLayout>
      <div className="p-5">
        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to edit the category.
            </p>
          </div>
        </div>

        {/* Form for creating category */}
        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {(errors.Name || Object.keys(errors).length > 0) && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {errors.Name ||
                    errors.Uni_categories_slug ||
                    (Object.values(errors)[0] as string) ||
                    "Terjadi kesalahan"}
                </span>
              </div>
            )}

            <div className="flex justify-star">
              {/* Button to cancel and go back */}
              <button
                type="button"
                className="px-4 py-2 flex items-center bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200 mr-2"
                onClick={() => window.history.back()}
              >
                <FiArrowLeft className="mr-2" size={18} />
                Cancel
              </button>
              {/* Button to save category */}
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 flex items-center bg-linear-to-br from-yellow-800 to-yellow-400 text-white rounded-xl hover:bg-yellow-700 transition-colors duration-200"
              >
                <FiSave className="mr-2" size={18} />
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryEdit;
