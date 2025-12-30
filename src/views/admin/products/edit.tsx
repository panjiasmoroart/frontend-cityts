//import React and hooks
import React, { useState, useEffect, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate dan useParams
import { useNavigate, useParams } from "react-router";

// import useProductById hook
import { useProductById } from "../../../hooks/admin/product/useProductById";

// import useProductUpdate hook
import { useProductUpdate } from "../../../hooks/admin/product/useProductUpdate";

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

const ProductEdit: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Edit Product - City Santri Kab. Depok";
  }, []);

  // inisialisasi useNavigate
  const navigate = useNavigate();

  // inisialisasi useParams untuk mendapatkan id dari URL
  const { id } = useParams();

  // state form
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [owner, setOwner] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // state error
  const [errors, setErrors] = useState<ValidationErrors>({});

  // fetch product detail
  const { data: product } = useProductById(Number(id));

  // fetch update product
  const { mutate, isPending } = useProductUpdate();

  // populate form ketika data product tersedia
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setContent(product.content);
      setPrice(product.price);
      setOwner(product.owner);
      setPhone(product.phone);
      setAddress(product.address);
    }
  }, [product]);

  // handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //panggil fungsi mutate untuk update product
    mutate(
      {
        id: Number(id),
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
          //redirect ke halaman daftar produk
          navigate("/admin/products");

          // tampilkan notifikasi sukses
          toast.success("Product updated successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // set errors state
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
            <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to update the selected product.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* IMAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>
            {errors.Image && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl">
                <span>{errors.Image}</span>
              </div>
            )}

            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>
            {errors.Title && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                <span>{errors.Title}</span>
              </div>
            )}

            {/* CONTENT */}
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
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                <span>{errors.Content}</span>
              </div>
            )}

            {/* PRICE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Product Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>
            {errors.Price && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                <span>{errors.Price}</span>
              </div>
            )}

            {/* OWNER */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Owner Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>
            {errors.Owner && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                <span>{errors.Owner}</span>
              </div>
            )}

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>
            {errors.Phone && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                <span>{errors.Phone}</span>
              </div>
            )}

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Business Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl"
              />
            </div>
            {errors.Address && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                <span>{errors.Address}</span>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 flex items-center bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 mr-2"
              >
                <FiArrowLeft className="mr-2" size={18} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 flex items-center bg-linear-to-br from-yellow-800 to-yellow-400 text-white rounded-xl hover:bg-yellow-700"
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

export default ProductEdit;
