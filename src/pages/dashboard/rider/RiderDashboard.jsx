import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();

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
      text: "This rider application will be rejected.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Red
      cancelButtonColor: '#6b7280', // Gray
      confirmButtonText: 'Yes, reject'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/${id}`, { status: 'rejected' })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire('Rejected!', 'Rider has been rejected.', 'success');
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

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-sm min-h-screen">
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-bold text-[#0A2533] mb-2">All Riders</h1>
        <p className="text-gray-500 font-medium">Review and manage rider applications here.</p>
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
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold rounded-tr-xl rounded-br-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {riders.length > 0 ? (
                riders.map((rider) => (
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
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider ${
                        rider.status === 'approved' ? 'bg-green-100 text-green-700' :
                        rider.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {rider.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleApprove(rider._id)}
                        disabled={rider.status !== 'pending'}
                        className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(rider._id)}
                        disabled={rider.status !== 'pending'}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-12 text-gray-400 font-medium">
                    No riders found at this moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RiderDashboard;
