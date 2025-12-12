// import React
import React, { useEffect, useState, type FormEvent } from "react";

// import react-icons
import { FiSave, FiArrowLeft } from "react-icons/fi";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import useNavigate, useParams dari react-router
import { useNavigate, useParams } from "react-router";

// import toast
import { toast } from "react-hot-toast";

// import hooks useRoleById, useRoleUpdate, usePermissionsAll
import { useRoleById } from "../../../hooks/admin/role/useRoleById";
import { useRoleUpdate } from "../../../hooks/admin/role/useRoleUpdate";
import { usePermissionsAll } from "../../../hooks/admin/permission/usePermissionsAll";
import type { ApiErrorResponse } from "../../../types/error-response";
import type { AxiosError } from "axios";

// interface untuk error validasi
interface ValidationErrors {
  [key: string]: string;
}

const RoleEdit: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Edit Role - City Santri Kab. Depok";
  }, []);

  //navigate hook
  const navigate = useNavigate();

  //ambil ID dari parameter URL
  const { id } = useParams();
  const roleId = Number(id);

  //state untuk form
  const [name, setName] = useState("");
  const [permissionIds, setPermissionIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  // const [initialized, setInitialized] = useState(false);

  // fetch role detail by ID
  const { data: role } = useRoleById(roleId);

  // fetch all permissions
  const { data: permissions } = usePermissionsAll();

  // mutation update role
  const { mutate, isPending } = useRoleUpdate();

  // group permissions by prefix
  const groupedPermissions = permissions?.reduce((groups, permission) => {
    const [group] = permission.name.split("-");
    if (!groups[group]) groups[group] = [];
    groups[group].push(permission);
    return groups;
  }, {} as Record<string, typeof permissions>);

  // populate state from fetched role
  useEffect(() => {
    if (role) {
      setName(role.name);
      setPermissionIds((role.permissions ?? []).map((p) => p.id));
    }
  }, [role]);

  // if (role && name === "") {
  //   setName(role.name);
  //   setPermissionIds((role.permissions ?? []).map((p) => p.id));
  // }

  // handle checkbox toggle
  const handleCheckboxChange = (id: number) => {
    setPermissionIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate(
      { id: roleId, name, permission_ids: permissionIds },
      {
        onSuccess: () => {
          toast.success("Role updated successfully!", {
            position: "top-right",
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Role</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Update the selected role.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                                onChange={() => handleCheckboxChange(perm.id)}
                              />
                              <span>{perm.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {errors.permission_ids && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.permission_ids}
                </p>
              )}
            </div>

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

export default RoleEdit;
