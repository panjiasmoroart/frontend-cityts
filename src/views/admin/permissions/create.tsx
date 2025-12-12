//import React, useState dan type FormEvent
import React, { useEffect, useState, type FormEvent } from "react";

// import react icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

//import useNavigate dari react-router
import { useNavigate } from "react-router";

//import usePermissionCreate hook
import { usePermissionCreate } from "../../../hooks/admin/permission/usePermissionCreate";

// import toast dari react-hot-toast
import { toast } from "react-hot-toast";
import type { ApiErrorResponse } from "../../../types/error-response";
import { AxiosError } from "axios";

//interface untuk error validasi
interface ValidationErrors {
  [key: string]: string;
}

const PermissionCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create Permission - City Santri Kab. Depok";
  }, []);

  //hook useNavigate
  const navigate = useNavigate();

  //state untuk menyimpan data permission
  const [name, setName] = useState<string>("");

  //state untuk menyimpan error validasi
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Inisialisasi hook usePermissionCreate
  const { mutate, isPending } = usePermissionCreate();

  //function untuk handle submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name: name,
      },
      {
        onSuccess: () => {
          // redirect ke halaman permissions setelah berhasil
          navigate("/admin/permissions");

          // notifikasi sukses
          toast.success("Permission created successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // simpan error validasi jika ada
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
              Create Permission
            </h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to create a new permission.
            </p>
          </div>
        </div>

        {/* Form untuk membuat permission */}
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

            <div className="flex justify-start">
              {/* Tombol kembali */}
              <button
                type="button"
                className="px-4 py-2 flex items-center bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200 mr-2"
                onClick={() => window.history.back()}
              >
                <FiArrowLeft className="mr-2" size={18} />
                Cancel
              </button>

              {/* Tombol simpan */}
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

export default PermissionCreate;
