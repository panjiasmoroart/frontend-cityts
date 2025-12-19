// import useState dan useEffect dari React
import { useState, useEffect } from "react";

// import react icons
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

// import Link dan useSearchParams dari react-router
import { Link, useSearchParams } from "react-router";

// import hasAnyPermission dari utils
import hasAnyPermission from "../../../utils/permissions";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import hook untuk mengambil data page
import { usePages } from "../../../hooks/admin/page/usePages";

// import component Table
import TableEmptyRow from "../../../components/General/TableEmptyRow";

// import component Pagination
import Pagination from "../../../components/General/Pagination";

// import component Loading
import Loading from "../../../components/General/Loading";

// import component Error
import Error from "../../../components/General/Error";

// import hook untuk delete page
import { usePageDelete } from "../../../hooks/admin/page/usePageDelete";

// import query client TanStack Query
import { useQueryClient } from "@tanstack/react-query";

// import toast dari react-hot-toast
import toast from "react-hot-toast";

const Pages: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Pages - City Santri Kab. Depok";
  }, []);

  // Ambil query string dari URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Ambil query 'search' dan 'page' dari URL
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // State pencarian dan halaman
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState<string>(initialSearch);
  const [page, setPage] = useState<number>(initialPage);

  // Ambil data halaman
  const { data, isLoading, isError } = usePages({
    page,
    search: submittedSearch,
  });

  // Sinkronkan URL jika search atau page berubah
  useEffect(() => {
    const params: Record<string, string> = {};

    if (submittedSearch) params.search = submittedSearch;
    if (page > 1) params.page = String(page);

    setSearchParams(params);
  }, [submittedSearch, page]);

  // Query Client
  const queryClient = useQueryClient();

  // Hook hapus page
  const { mutate, isPending } = usePageDelete();

  // Fungsi hapus page
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this page?")) {
      // Panggil mutate untuk menghapus page
      mutate(id, {
        onSuccess: () => {
          // Invalidate queries to refresh data
          queryClient.invalidateQueries({ queryKey: ["pages"] });

          // Reset search and page state
          setPage(1);

          // notifikasi sukses hapus
          toast.success("Page deleted successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: Error) => {
          // notifikasi error hapus
          alert(`Failed to delete page: ${error.message}`);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-5">
        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Pages</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Manage your static pages easily. Add, edit, or delete as needed.
            </p>
          </div>
          {hasAnyPermission(["pages-create"]) && (
            <Link
              to="/admin/pages/create"
              className="px-4 py-2 bg-linear-to-br from-yellow-800 to-yellow-400 border-2 border-yellow-100 text-white rounded-xl hover:bg-blue-700 
                            flex items-center transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FiPlus className="mr-2" size={18} />
              Add New Page
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
            placeholder="Search page..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setSubmittedSearch(searchTerm);
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
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((page) => (
                      <tr
                        key={page.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                          {page.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(page.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            {hasAnyPermission(["pages-edit"]) && (
                              <Link
                                to={`/admin/pages/edit/${page.id}`}
                                className="text-blue-500 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </Link>
                            )}
                            {hasAnyPermission(["pages-delete"]) && (
                              <button
                                onClick={() => handleDelete(page.id)}
                                disabled={isPending}
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
                      text="No Page Found"
                      subText={
                        searchTerm ? "Try with Other Keywords" : "Add New Page"
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
                  onPageChange={setPage}
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

export default Pages;
