//import React dari React
import React, { useState, useEffect, type FormEvent } from "react";

//import icon dari react-icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

//import layout admin
import AdminLayout from "../../../layouts/admin";

//import useNavigate dan useParams dari react-router
import { useNavigate, useParams } from "react-router";

//import custom hooks
import { usePermissionById } from "../../../hooks/admin/permission/usePermissionById";
import { usePermissionUpdate } from "../../../hooks/admin/permission/usePermissionUpdate";

//import toast dari react-hot-toast
import { toast } from "react-hot-toast";

import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

//interface untuk error validasi
interface ValidationErrors {
  [key: string]: string;
}

const PermissionEdit: React.FC = () => {
  //title

  useEffect(() => {
    document.title = "Edit Permission - City Santri Kab. Depok";
  }, []);

  //hook navigate
  const navigate = useNavigate();

  //ambil ID dari parameter URL
  const { id } = useParams();

  //ambil data permission berdasarkan ID
  const { data: permission } = usePermissionById(Number(id));

  //state untuk input nama permission
  // const [name, setName] = useState<string>("");
  const [name, setName] = useState(() => permission?.name ?? "");

  //state untuk menyimpan error validasi
  const [errors, setErrors] = useState<ValidationErrors>({});

  //isi field form jika data permission sudah ada, kena warning
  // useEffect(() => {
  //   if (permission) {
  //     setName(permission.name);
  //   }
  // }, [permission]);
  // permission sudah ada, fetch selesai && input belum pernah diisi, masih state awal.
  if (permission && name === "") {
    setName(permission.name);
  }

  //init hook untuk update permission
  const { mutate, isPending } = usePermissionUpdate();

  //handle submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        id: Number(id),
        name,
      },
      {
        onSuccess: () => {
          //redirect setelah berhasil update
          navigate("/admin/permissions");

          //tampilkan notifikasi sukses
          toast.success("Permission updated successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          //set error validasi
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
              Edit Permission
            </h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form untuk mengubah permission.
            </p>
          </div>
        </div>

        {/* Form edit */}
        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permission Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter permission name"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Menampilkan pesan error validasi */}
            {errors.Name && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Name}</span>
              </div>
            )}

            {/* Tombol aksi */}
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

export default PermissionEdit;
