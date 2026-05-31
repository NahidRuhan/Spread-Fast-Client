import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Shield, ShieldOff, Search } from 'lucide-react';

const UserManage = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data = {}, isLoading: loading, refetch } = useQuery({
    queryKey: ['users', search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}&page=${page}&size=${limit}`);
      return res.data;
    }
  });

  const users = data.users || [];
  const totalCount = data.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const handleRoleUpdate = (user, newRole) => {
    const isMakingAdmin = newRole === 'admin';
    
    Swal.fire({
      title: isMakingAdmin ? 'Make Admin?' : 'Remove Admin?',
      text: isMakingAdmin 
        ? `Do you want to make ${user.name} an admin?` 
        : `Do you want to change ${user.name}'s role back to user?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: isMakingAdmin ? '#22c55e' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role: newRole })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire('Updated!', `User role is now ${newRole}.`, 'success');
              refetch(); // Reload the table data to reflect changes
            }
          })
          .catch(error => {
            console.error("Error updating user role:", error);
            Swal.fire('Error!', 'Failed to update user role.', 'error');
          });
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-sm min-h-screen">
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0A2533] mb-2">Manage Users</h1>
          <p className="text-gray-500 font-medium">View and manage all registered users in the system.</p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner text-green-500 w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold rounded-tl-xl rounded-bl-xl w-16">#</th>
                <th className="p-4 font-semibold">User Info</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold rounded-tr-xl rounded-br-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 text-gray-500 font-medium">{((page - 1) * limit) + index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.image || 'https://via.placeholder.com/40'} 
                        alt={user.name} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover bg-gray-200" 
                      />
                      <div>
                        <p className="font-bold text-[#0A2533]">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'rider' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRoleUpdate(user, 'user')}
                        title="Remove Admin"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shadow-sm bg-white border border-gray-100"
                      >
                        <ShieldOff size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleUpdate(user, 'admin')}
                        title="Make Admin"
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors shadow-sm bg-white border border-gray-100"
                      >
                        <Shield size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalCount > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-100 gap-4">
              <p className="text-sm text-gray-500 font-medium">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalCount)} of {totalCount} users
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-[#0A2533] transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-[#0A2533] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManage;
