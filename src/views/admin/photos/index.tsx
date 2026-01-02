// import useState from React
import { useState, useEffect } from "react";

// import react router
import { useSearchParams } from "react-router";

// import react icons
import { FiSearch, FiTrash2 } from "react-icons/fi";

//import hasAnyPermission from utils
import hasAnyPermission from "../../../utils/permissions";

// import layout admin
import AdminLayout from "../../../layouts/admin";

// import hook untuk mengambil data photos
import { usePhotos } from "../../../hooks/admin/photo/usePhotos";

// import component Table
import TableEmptyRow from "../../../components/General/TableEmptyRow";

// import component Pagination
import Pagination from "../../../components/General/Pagination";

// import component Loading
import Loading from "../../../components/General/Loading";

// import component Error
import Error from "../../../components/General/Error";

//import view create
import Create from "./create";

// import hook untuk delete photo
import { usePhotoDelete } from "../../../hooks/admin/photo/usePhotoDelete";

//import query client TanStack Query
import { useQueryClient } from "@tanstack/react-query";

// import toast dari react-hot-toast untuk notifikasi
import toast from "react-hot-toast";

const Photos: React.FC = () => {
  //title
  useEffect(() => {
    document.title = "Photos - City Santri Kab. Depok";
  }, []);

  // Ambil query string dari URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Ambil query 'search' dan 'page' dari URL
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // State untuk menyimpan term pencarian dan halaman saat ini
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

  // Ambil data photos
  const { data, isLoading, isError } = usePhotos({
    page,
    search: submittedSearch,
  });

  // Update URL ketika search atau page berubah
  useEffect(() => {
    const params: Record<string, string> = {};

    if (submittedSearch) params.search = submittedSearch;
    if (page > 1) params.page = String(page);

    setSearchParams(params);
  }, [submittedSearch, page]);

  //initialize useQueryClient
  const queryClient = useQueryClient();

  // Menggunakan hook usePhotoDelete untuk menghapus photo
  const { mutate, isPending } = usePhotoDelete();

  // Fungsi untuk menangani penghapusan kategori
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      // Panggil mutate dari usePhotoDelete untuk menghapus kategori
      mutate(id, {
        onSuccess: () => {
          // Setelah berhasil menghapus, invalidate query untuk memperbarui data
          queryClient.invalidateQueries({ queryKey: ["photos"] });

          // Setelah berhasil, reset halaman ke 1
          setPage(1);

          // Tampilkan notifikasi sukses
          toast.success("Photo deleted successfully!", {
            position: "top-right",
            duration: 3000,
          });
        },
        onError: (error: Error) => {
          // Tampilkan pesan error jika ada
          alert(`Failed to delete photo: ${error.message}`);
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-5">
        {hasAnyPermission(["photos-create"]) && <Create />}

        <hr className="my-6 border border-gray-300" />

        {/* Header with Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Photos</h1>
            <p className="text-sm text-gray-500 mt-1 italic">
              Manage your photo gallery easily. Add, edit, or delete photos as
              needed.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="bg-white block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none transition-all duration-200"
            placeholder="Search photo..."
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
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Caption
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((photo) => (
                      <tr
                        key={photo.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`${
                              import.meta.env.VITE_BASE_URL
                            }/uploads/photos/${photo.image}`}
                            alt={photo.caption}
                            className="w-20 h-14 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {photo.caption}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {photo.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            {hasAnyPermission(["photos-delete"]) && (
                              <button
                                onClick={() => handleDelete(photo.id)}
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
                      colSpan={4}
                      text="No Photo Found"
                      subText={
                        searchTerm ? "Try with Other Keywords" : "Add New Photo"
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

export default Photos;
