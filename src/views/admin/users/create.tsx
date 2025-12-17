// import React, useState dan type FormEvent
import React, { useEffect, useState, type FormEvent } from "react";

// import react-icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate dari react-router
import { useNavigate } from "react-router";

// import toast
import { toast } from "react-hot-toast";

// import hook create user
import { useUserCreate } from "../../../hooks/admin/user/useUserCreate";

// import hook get all roles
import { useRolesAll } from "../../../hooks/admin/role/useRolesAll";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { AxiosError } from "axios";

// interface untuk error validasi
interface ValidationErrors {
  [key: string]: string;
}

const UserCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create User - City Santri Kab. Depok";
  }, []);

  // useNavigate hook
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [roleIds, setRoleIds] = useState<number[]>([]);

  // error state
  const [errors, setErrors] = useState<ValidationErrors>({});

  // fetch roles
  const { data: roles } = useRolesAll();

  // mutation create user
  const { mutate, isPending } = useUserCreate();

  // handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // panggil mutation
    mutate(
      {
        name,
        username,
        email,
        password,
        role_ids: roleIds,
      },
      {
        onSuccess: () => {
          // notifikasi sukses
          toast.success("User created successfully!", {
            position: "top-right",
            duration: 3000,
          });

          // kembali ke halaman user
          navigate("/admin/users");
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
          // set error
          setErrors(error.response?.data?.errors || {});
        },
      }
    );
  };

  // handle checkbox
  const handleCheckboxChange = (id: number) => {
    setRoleIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout>
      <div className="p-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create User</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to create a new user.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.Name && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                  role="alert"
                >
                  <span className="block sm:inline">{errors.Name}</span>
                </div>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {(errors.Username || errors.Uni_users_username) && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                  role="alert"
                >
                  <span className="block sm:inline">
                    {errors.Username || errors.Uni_users_username}
                  </span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.Email && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                  role="alert"
                >
                  <span className="block sm:inline">{errors.Email}</span>
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {errors.Password && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                  role="alert"
                >
                  <span className="block sm:inline">{errors.Password}</span>
                </div>
              )}
            </div>

            {/* Roles */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Roles
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {roles?.map((role) => (
                  <label
                    key={role.id}
                    className="flex items-center space-x-2 bg-gray-100 p-3 rounded-xl border hover:bg-gray-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={role.id}
                      checked={roleIds.includes(role.id)}
                      onChange={() => handleCheckboxChange(role.id)}
                    />
                    <span className="text-sm text-gray-700">{role.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 flex items-center bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200 mr-2"
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

export default UserCreate;
