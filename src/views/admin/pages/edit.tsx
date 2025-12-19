//import React and hooks
import React, { useState, useEffect, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate dan useParams
import { useNavigate, useParams } from "react-router";

// import usePageUpdate hook
import { usePageUpdate } from "../../../hooks/admin/page/usePageUpdate";

// import usePageById hook
import { usePageById } from "../../../hooks/admin/page/usePageById";

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

const PageEdit: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Edit Page - City Santri Kab. Depok";
  }, []);

  //hook navigate
  const navigate = useNavigate();

  //get id from params
  const { id } = useParams();

  // state form
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // fetch page detail
  const { data: page } = usePageById(Number(id));

  // update page mutation
  const { mutate, isPending } = usePageUpdate();

  // isi form dari data page saat data tersedia
  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setContent(page.content);
    }
  }, [page]);

  // handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Panggil mutation usePageUpdate
    mutate(
      {
        id: Number(id),
        title,
        content,
      },
      {
        onSuccess: () => {
          // Navigasi setelah sukses
          navigate("/admin/pages");

          // Tampilkan notifikasi sukses
          toast.success("Page updated successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // Set error state jika terjadi error
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
            <h1 className="text-2xl font-bold text-gray-800">Edit Page</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to update the selected page.
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
            {(errors.Title || Object.keys(errors).length > 0) && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">
                  {" "}
                  {errors.Title ||
                    errors.Uni_pages_slug ||
                    (Object.values(errors)[0] as string) ||
                    "Terjadi kesalahan"}
                </span>
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
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
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
                {isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PageEdit;
