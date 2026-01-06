// import useState from React
import { useState, useEffect } from "react";

// import react icons
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

// import Link from react-router
import { Link, useSearchParams } from "react-router";

// import hasAnyPermission dari utils
import hasAnyPermission from "../../../utils/permissions";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import hook untuk mengambil data aparatur
import { useAparaturs } from "../../../hooks/admin/aparatur/useAparaturs";

// import component Table
import TableEmptyRow from "../../../components/General/TableEmptyRow";

// import component Pagination
import Pagination from "../../../components/General/Pagination";

// import component Loading
import Loading from "../../../components/General/Loading";

// import component Error
import Error from "../../../components/General/Error";

const Aparaturs: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Aparaturs - City Santri Kab. Depok";
  }, []);

  // Ambil query string dari URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Ambil query 'search' dan 'page' dari URL
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // State untuk menyimpan term pencarian dan halaman saat ini
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(initialPage);

  // panggil hook useAparaturs
  const { data, isLoading, isError } = useAparaturs({
    page,
    search: submittedSearch,
  });

  // Update query string ketika search atau page berubah
  useEffect(() => {
    const params: Record<string, string> = {};

    if (submittedSearch) params.search = submittedSearch;
    if (page > 1) params.page = String(page); // kalau halaman 1, nggak perlu ditulis

    setSearchParams(params);
  }, [submittedSearch, page]);

  return (
    <AdminLayout>
      <div className="p-5">
        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Aparaturs
            </h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Manage your organizational members here.
            </p>
          </div>
          {hasAnyPermission(["aparaturs-create"]) && (
            <Link
              to="/admin/aparaturs/create"
              className="px-4 py-2 bg-linear-to-br from-yellow-800 to-yellow-400 border-2 border-yellow-100 text-white rounded-xl hover:bg-blue-700 
                            flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FiPlus className="mr-2" size={18} />
              Add New Aparatur
            </Link>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="bg-white block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
            placeholder="Search aparatur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1); // reset ke halaman 1 saat pencarian baru
                setSubmittedSearch(searchTerm); // trigger pencarian baru
              }
            }}
          />
        </div>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* Error State */}
        {isError && <Error />}

        {/* Success State */}
        {!isLoading && !isError && (
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((aparatur) => (
                      <tr
                        key={aparatur.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {aparatur.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {aparatur.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            {hasAnyPermission(["aparaturs-edit"]) && (
                              <Link
                                to={`/admin/aparaturs/edit/${aparatur.id}`}
                                className="text-blue-500 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </Link>
                            )}

                            {hasAnyPermission(["aparaturs-delete"]) && (
                              <button
                                className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                                title="Hapus"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <TableEmptyRow
                      colSpan={3}
                      text="No Aparatur Found"
                      subText={
                        searchTerm
                          ? "Try with Other Keywords"
                          : "Add New Aparatur"
                      }
                    />
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data?.data && data.data.length > 0 && (
              <div className="px-6 pb-5 border-t border-gray-100 bg-gray-100">
                <Pagination
                  currentPage={data.current_page}
                  totalPages={data.last_page}
                  onPageChange={(newPage) => setPage(newPage)}
                  position="right"
                  maxVisiblePages={5}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Aparaturs;
