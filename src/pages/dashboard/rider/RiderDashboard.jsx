import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch all riders using TanStack Query
  const { data: riders = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    }
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Approve Rider?',
      text: "This rider will be approved to take deliveries.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e', // Success Green
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/${id}`, { status: 'approved' })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire('Approved!', 'Rider has been approved.', 'success');
              refetch(); // Automatically refetch fresh data
            }
          })
          .catch(error => {
            console.error("Error approving rider:", error);
            Swal.fire('Error!', 'Something went wrong while approving the rider.', 'error');
          });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Reject Rider?',
      text: "This rider application will be rejected and removed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Red
      cancelButtonColor: '#6b7280', // Gray
      confirmButtonText: 'Yes, reject'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Rejected!', 'Rider application has been rejected and removed.', 'success');
              refetch(); // Automatically refetch fresh data
            }
          })
          .catch(error => {
            console.error("Error rejecting rider:", error);
            Swal.fire('Error!', 'Something went wrong while rejecting the rider.', 'error');
          });
      }
    });
  };

  const pendingRiders = riders.filter(r => r.status === 'pending' || !r.status);
  const approvedRiders = riders.filter(r => r.status === 'approved');

  return (
    <div className="w-full space-y-8 min-h-screen">
      {/* Pending Requests Section */}
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 w-full shadow-sm">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-[#0A2533] mb-2">Pending Requests</h2>
          <p className="text-gray-500 font-medium">Review and manage new rider applications here.</p>
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
                  <th className="p-4 font-semibold rounded-tl-xl rounded-bl-xl">Name & Contact</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Bike Details</th>
                  <th className="p-4 font-semibold rounded-tr-xl rounded-br-xl text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingRiders.length > 0 ? (
                  pendingRiders.map((rider) => (
                    <tr key={rider._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="p-4">
                        <div className="font-bold text-[#0A2533] text-lg">{rider.name}</div>
                        <div className="text-sm font-medium text-gray-500">{rider.email}</div>
                        <div className="text-sm font-medium text-gray-500">{rider.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{rider.district}</div>
                        <div className="text-sm text-gray-500">{rider.region}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{rider.bikeDetails}</div>
                        <div className="text-sm text-gray-500">Reg: {rider.bikeRegistration}</div>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleApprove(rider._id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(rider._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-12 text-gray-400 font-medium">
                      No pending requests at this moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Riders Section */}
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 w-full shadow-sm">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-[#0A2533] mb-2">All Riders</h2>
          <p className="text-gray-500 font-medium">Overview of all riders in the system.</p>
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
                  <th className="p-4 font-semibold rounded-tl-xl rounded-bl-xl">Name & Contact</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Bike Details</th>
                  <th className="p-4 font-semibold rounded-tr-xl rounded-br-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {approvedRiders.length > 0 ? (
                  approvedRiders.map((rider) => (
                    <tr key={rider._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td 
                        className="p-4 cursor-pointer group" 
                        onClick={() => setSelectedRider(rider)}
                      >
                        <div className="font-bold text-[#0A2533] text-lg group-hover:text-green-600 transition-colors">{rider.name}</div>
                        <div className="text-sm font-medium text-gray-500">{rider.email}</div>
                        <div className="text-sm font-medium text-gray-500">{rider.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{rider.district}</div>
                        <div className="text-sm text-gray-500">{rider.region}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{rider.bikeDetails}</div>
                        <div className="text-sm text-gray-500">Reg: {rider.bikeRegistration}</div>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider inline-block ${
                          rider.workStatus === 'available' ? 'bg-green-100 text-green-700' :
                          rider.workStatus === 'unavailable' ? 'bg-red-100 text-red-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {rider.workStatus || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-12 text-gray-400 font-medium">
                      No riders found at this moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rider Details Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-[#0A2533]">Rider Details</h2>
              <button 
                onClick={() => setSelectedRider(null)}
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">General Info</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <p className="text-sm text-gray-500">Rider ID</p>
                      <p className="font-medium text-gray-800 text-xs font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                        {selectedRider._id || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-800">{selectedRider.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800 break-all">{selectedRider.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">{selectedRider.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">NID</p>
                      <p className="font-medium text-gray-800">{selectedRider.nid || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">License Number</p>
                      <p className="font-medium text-gray-800">{selectedRider.licenseNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                        selectedRider.status === 'approved' ? 'bg-green-100 text-green-700' :
                        selectedRider.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {selectedRider.status || 'pending'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Work Status</p>
                      <p className="font-medium text-gray-800 capitalize">{selectedRider.workStatus || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Created</p>
                      <p className="font-medium text-gray-800">
                        {selectedRider.created_at ? new Date(selectedRider.created_at).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Location</h3>
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-medium text-gray-800">{selectedRider.region || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="font-medium text-gray-800">{selectedRider.district || 'N/A'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Bike Information</h3>
                  <div>
                    <p className="text-sm text-gray-500">Details</p>
                    <p className="font-medium text-gray-800">{selectedRider.bikeDetails || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration</p>
                    <p className="font-medium text-gray-800">{selectedRider.bikeRegistration || 'N/A'}</p>
                  </div>
                </div>

                {selectedRider.aboutYourself && (
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">About</h3>
                    <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {selectedRider.aboutYourself}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedRider(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
