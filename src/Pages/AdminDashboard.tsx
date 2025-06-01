import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  BookOpen, 
  Activity, 
  TrendingUp,
  UserCheck,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import UserTable from "../components/admin/UserTable";
import { useApi } from "../hooks/useApi";
import { adminService, type AdminStats } from "../services/adminService";

const AdminDashboard: React.FC = () => {
  // Fetch admin dashboard data
  const { data: dashboardData, loading, error, refetch: refetchDashboard } = useApi<AdminStats>(
    () => adminService.getDashboard()
  );

  // Fetch users for user table
  const { data: usersData, loading: usersLoading, error: usersError, refetch: refetchUsers } = useApi(
    () => adminService.getUsers({ page: 1, limit: 10 })
  );

  const handleRefresh = () => {
    refetchDashboard();
    refetchUsers();
  };

  const stats = dashboardData?.statistics;
  const recentUsers = dashboardData?.recentUsers || [];
  const recentActions = dashboardData?.recentActions || [];
  const users = usersData?.users || [];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Kelola platform BUMIVERSE dengan mudah
              </p>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-300">Memuat data...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-200">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error loading dashboard</span>
              </div>
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Statistics Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.users}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Articles
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.articles}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-green-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Education Topics
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.educationTopics}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      User Actions
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.userActions}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-500" />
                </div>
              </motion.div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-500" />
                  Recent Users
                </h3>
              </div>
              <div className="p-6">
                {recentUsers.length > 0 ? (
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={user._id || index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.username}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">
                            {user.totalPoints || 0} pts
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(user.createdAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No recent users</p>
                )}
              </div>
            </motion.div>

            {/* Recent Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Recent Actions
                </h3>
              </div>
              <div className="p-6">
                {recentActions.length > 0 ? (
                  <div className="space-y-4">
                    {recentActions.slice(0, 5).map((action, index) => (
                      <div key={action._id || index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {action.label}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            by {action.user?.username || 'Unknown'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">
                            +{action.points} pts
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(action.createdAt).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">No recent actions</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* User Management Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                User Management
              </h3>
            </div>
            <div className="p-6">
              {usersLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                </div>
              ) : usersError ? (
                <div className="text-red-500 text-center py-8">
                  Error loading users: {usersError}
                </div>
              ) : (
                <UserTable 
                  users={users} 
                  token={localStorage.getItem('token')} 
                  onUserUpdate={() => handleRefresh()} 
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;