import React, { useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Trash2Icon,
  UsersIcon,
  SearchIcon,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useMutation } from "../../hooks/useApi";
import { adminService } from "../../services/adminService";

const USERS_PER_PAGE = 10;

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  totalPoints: number;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  token: string | null;
  onUserUpdate: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, token, onUserUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  // Mutations for user management
  const { mutate: updateRole, loading: updatingRole } = useMutation(
    ({ userId, role }: { userId: string; role: string }) => 
      adminService.updateUserRole(userId, role)
  );

  const { mutate: deleteUser, loading: deletingUser } = useMutation(
    (userId: string) => adminService.deleteUser(userId)
  );

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!token) {
      showNotification('error', 'Token tidak tersedia. Silakan login ulang.');
      return;
    }

    try {
      const result = await updateRole({ userId, role: newRole });
      if (result) {
        showNotification('success', `Role berhasil diubah ke ${newRole}`);
        onUserUpdate(); // Refresh data
      } else {
        showNotification('error', 'Gagal mengubah role pengguna');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      showNotification('error', 'Terjadi kesalahan saat mengubah role');
    }
  };

  const handleDeleteUser = async (userId: string, username: string) => {
    if (!window.confirm(`Yakin ingin menghapus pengguna "${username}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    if (!token) {
      showNotification('error', 'Token tidak tersedia. Silakan login ulang.');
      return;
    }

    try {
      const result = await deleteUser(userId);
      if (result) {
        showNotification('success', `Pengguna "${username}" berhasil dihapus`);
        onUserUpdate(); // Refresh data
      } else {
        showNotification('error', 'Gagal menghapus pengguna');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('error', 'Terjadi kesalahan saat menghapus pengguna');
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      {/* Notification */}
      {notification && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          notification.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header: Total Users & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium">
          <UsersIcon className="w-5 h-5 text-blue-500" />
          <span>Total User: {filteredUsers.length}</span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
          />
          <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Poin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Bergabung
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.totalPoints || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      {user.role === "user" ? (
                        <button
                          onClick={() => handleUpdateRole(user._id, "admin")}
                          disabled={updatingRole}
                          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-xs font-medium px-3 py-1 rounded transition"
                          title="Jadikan Admin"
                        >
                          <ArrowUpIcon size={12} />
                          {updatingRole ? "..." : "Promote"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateRole(user._id, "user")}
                          disabled={updatingRole}
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white text-xs font-medium px-3 py-1 rounded transition"
                          title="Jadikan User Biasa"
                        >
                          <ArrowDownIcon size={12} />
                          {updatingRole ? "..." : "Demote"}
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user._id, user.username)}
                        disabled={deletingUser}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs font-medium px-3 py-1 rounded transition"
                        title="Hapus Pengguna"
                      >
                        <Trash2Icon size={12} />
                        {deletingUser ? "..." : "Hapus"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Tidak ada pengguna yang cocok dengan pencarian" : "Belum ada pengguna"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Menampilkan {((currentPage - 1) * USERS_PER_PAGE) + 1} - {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} dari {filteredUsers.length} pengguna
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Sebelumnya
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded transition ${
                    currentPage === page
                      ? "bg-green-600 text-white"
                      : "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;