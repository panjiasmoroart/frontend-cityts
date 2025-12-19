//import React and hooks
import React, { useEffect, useState, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate
import { useNavigate } from "react-router";

// import usePostCreate hook
import { usePostCreate } from "../../../hooks/admin/post/usePostCreate";

// import useCategoriesAll hook
import { useCategoriesAll } from "../../../hooks/admin/category/useCategoriesAll";

// import react Quill
import ReactQuill from "react-quill-new";

// quill CSS
import "react-quill-new/dist/quill.snow.css";

// toast
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { Category } from "../../../types/category";

// interface error
interface ValidationErrors {
  [key: string]: string;
}

const PostCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create Post - City Santri Kab. Depok";
  }, []);

  // useNavigate
  const navigate = useNavigate();

  //state form
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  //state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Inisialisasi useCategoriesAll hook
  const { data: categories } = useCategoriesAll();

  // Inisialisasi usePostCreate hook
  const { mutate, isPending } = usePostCreate();

  //function untuk handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        image,
        category_id: categoryId,
        title,
        content,
      },
      {
        onSuccess: () => {
          navigate("/admin/posts");
          toast.success("Post created successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
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
            <h1 className="text-2xl font-bold text-gray-800">Create Post</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to create a new post.
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                placeholder="image.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Image && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Image}</span>
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="0">Select Category</option>
                {categories?.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {(errors.CategoryID || errors.category_id) && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">
                  {errors.CategoryID || errors.category_id}
                </span>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
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

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Post Content"
                value={content}
                onChange={(val) => setContent(val)}
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

            {/* Actions */}
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

export default PostCreate;
