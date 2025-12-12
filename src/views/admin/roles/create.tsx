// import React
import React, { useEffect, useState, type FormEvent } from "react";

// import react-icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate dari react-router
import { useNavigate } from "react-router";

// import toast
import { toast } from "react-hot-toast";

// import hook create role
import { useRoleCreate } from "../../../hooks/admin/role/useRoleCreate";

// import get all permissions
import { usePermissionsAll } from "../../../hooks/admin/permission/usePermissionsAll";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../../types/error-response";

// interface untuk error validasi
interface ValidationErrors {
  [key: string]: string;
}

const RoleCreate: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Create Role - City Santri Kab. Depok";
  }, []);

  // navigate hook
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState<string>("");
  const [permissionIds, setPermissionIds] = useState<number[]>([]);

  // error state
  const [errors, setErrors] = useState<ValidationErrors>({});

  // fetch all permissions
  const { data: permissions } = usePermissionsAll();

  // group permissions
  const groupedPermissions = permissions?.reduce((groups, permission) => {
    const [group] = permission.name.split("-"); // ambil prefix-nya
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
    return groups;
  }, {} as Record<string, typeof permissions>);

  //   {
  //   "dashboard": [
  //     {
  //       "id": 1,
  //       "name": "dashboard-index",
  //       "created_at": "2025-11-14T17:38:14.908+07:00",
  //       "updated_at": "2025-11-14T17:38:14.908+07:00"
  //     }
  //   ],
  //   "users": [
  //     {
  //       "id": 2,
  //       "name": "users-index",
  //       "created_at": "2025-11-14T17:38:14.921+07:00",
  //       "updated_at": "2025-11-14T17:38:14.921+07:00"
  //     },
  //     {
  //       "id": 3,
  //       "name": "users-create",
  //       "created_at": "2025-11-14T17:38:14.929+07:00",
  //       "updated_at": "2025-11-14T17:38:14.929+07:00"
  //     }
  //   ],
  //   "permissions": [
  //     {
  //       "id": 8,
  //       "name": "permissions-index",
  //       "created_at": "2025-11-14T17:38:14.976+07:00",
  //       "updated_at": "2025-11-14T17:38:14.976+07:00"
  //     },
  //     {
  //       "id": 9,
  //       "name": "permissions-create",
  //       "created_at": "2025-11-14T17:38:14.985+07:00",
  //       "updated_at": "2025-11-14T17:38:14.985+07:00"
  //     }
  //   ],
  //   "testing": [
  //     {
  //       "id": 59,
  //       "name": "testing-slidersxx",
  //       "created_at": "2025-12-10T14:47:56.489+07:00",
  //       "updated_at": "2025-12-10T14:48:03.239+07:00"
  //     }
  //   ]
  // }

  // mutation create role
  const { mutate, isPending } = useRoleCreate();

  // handle submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name,
        permission_ids: permissionIds,
      },
      {
        onSuccess: () => {
          toast.success("Role created successfully!", {
            position: "top-right",
            duration: 3000,
          });
          navigate("/admin/roles");
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
            <h1 className="text-2xl font-bold text-gray-800">Create Role</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Form to create a new role.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter role name"
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

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {groupedPermissions &&
                    Object.entries(groupedPermissions).map(([group, perms]) => (
                      <div
                        key={group}
                        className="bg-gray-100 p-4 border border-gray-100 shadow-sm rounded-2xl"
                      >
                        <h2 className="font-semibold text-lg mb-2 capitalize border-b border-gray-300 py-2 pt-0">
                          {group}
                        </h2>
                        <div className="grid grid-cols-1 gap-2">
                          {perms.map((perm) => (
                            <label
                              key={perm.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                value={perm.id}
                                checked={permissionIds.includes(perm.id)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setPermissionIds((prev) =>
                                    checked
                                      ? [...prev, perm.id]
                                      : prev.filter((id) => id !== perm.id)
                                  );
                                }}
                              />
                              <span>{perm.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {errors.Permission_ids && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.Permission_ids}
                </p>
              )}
            </div>

            {/* Action Buttons */}
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

export default RoleCreate;
