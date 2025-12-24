//import React and hooks
import React, { useEffect, useState, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate
import { useNavigate } from "react-router";

// import useProductCreate hook
import { useProductCreate } from "../../../hooks/admin/product/useProductCreate";

//import react Quill
import ReactQuill from "react-quill-new";

// quill CSS
import "react-quill-new/dist/quill.snow.css";

// toast
import { toast } from "react-hot-toast";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { AxiosError } from "axios";

// interface error
interface ValidationErrors {
  [key: string]: string;
}

const ProductCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create Product - City Santri Kab. Depok";
  }, []);

  // useNavigate
  const navigate = useNavigate();

  //state form
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [owner, setOwner] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  //state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Inisialisasi useProductCreate hook
  const { mutate, isPending } = useProductCreate();

  //function untuk handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        image,
        title,
        content,
        price,
        owner,
        phone,
        address,
      },
      {
        onSuccess: () => {
          // redirect ke halaman products
          navigate("/admin/products");

          // notifikasi sukses
          toast.success("Product created successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // set error dari backend
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
            <h1 className="text-2xl font-bold text-gray-800">Create Product</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to create a new product.
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

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {(errors.Title || errors.Uni_products_slug) && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">
                  {errors.Title || errors.Uni_products_slug}
                </span>
              </div>
            )}

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Product Description"
                value={content}
                onChange={(val) => setContent(val)}
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

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Product Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Price && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Price}</span>
              </div>
            )}

            {/* Owner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Product Owner"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Owner && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Owner}</span>
              </div>
            )}

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {errors.Phone && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Phone}</span>
              </div>
            )}

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={2}
              />
            </div>
            {errors.Address && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl"
                role="alert"
              >
                <span className="block sm:inline">{errors.Address}</span>
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
                className="px-4 py-2 flex items-center bg-gradient-to-br from-yellow-800 to-yellow-400 text-white rounded-xl hover:bg-yellow-700 transition-colors duration-200"
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

export default ProductCreate;
