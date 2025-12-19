//import React and hooks
import React, { useEffect, useState, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate
import { useNavigate } from "react-router";

// import usePostCreate hook
import { usePageCreate } from "../../../hooks/admin/page/usePageCreate";

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

const PageCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create Page - City Santri Kab. Depok";
  }, []);

  // useNavigate
  const navigate = useNavigate();

  //state form
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  //state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Inisialisasi usePageCreate hook
  const { mutate, isPending } = usePageCreate();

  //function untuk handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Panggil mutation usePostCreate
    mutate(
      {
        title,
        content,
      },
      {
        onSuccess: () => {
          // Navigasi setelah sukses
          navigate("/admin/pages");

          // Tampilkan toast sukses
          toast.success("Page created successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // Set error jika ada validasi dari backend
          setErrors(error.response?.data?.errors || {});
        },
      }
    );
  };

  return (
    <AdminLayout>
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create Page</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to create a new page.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Input Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Title && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Title}</span>
              </div>
            )}

            {/* Input Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Page Content"
                value={content}
                onChange={(content) => setContent(content)}
                style={{ height: "200px", paddingBottom: "40px" }}
              />
            </div>
            {errors.Content && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Content}</span>
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

export default PageCreate;
