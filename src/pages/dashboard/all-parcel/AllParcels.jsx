import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['allParcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data;
    }
  });

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-sm min-h-screen">
      {/* Header Section */}
      <div className="mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-3xl font-bold text-[#0A2533] mb-2">All Parcels</h1>
        <p className="text-gray-500 font-medium">View and manage all parcels placed by users across the system.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner text-green-500 w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></span>
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-slate-700 text-sm uppercase tracking-wide">
                <th className="p-4 rounded-tl-xl font-semibold w-16">#</th>
                <th className="p-4 font-semibold">Parcel Info</th>
                <th className="p-4 font-semibold">Sender Details</th>
                <th className="p-4 font-semibold">Receiver Details</th>
                <th className="p-4 font-semibold text-center">Cost</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 rounded-tr-xl font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parcels.length > 0 ? (
                parcels.map((parcel, index) => (
                  <tr key={parcel._id} className="hover:bg-gray-50 transition-colors duration-200 text-sm">
                    <td className="p-4 text-gray-500 font-medium">{index + 1}</td>
                    <td className="p-4 font-medium text-slate-800">
                      {parcel.parcelName}
                      <br />
                      <span className="text-xs text-gray-400 font-normal tracking-wide">Type: {parcel.documentType}</span>
                      {parcel.trackingId && (
                        <>
                          <br />
                          <span className="text-xs text-gray-400 font-normal tracking-wide">Tracking: {parcel.trackingId}</span>
                        </>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">
                      <p className="font-semibold text-[#0A2533]">{parcel.senderName}</p>
                      <p className="text-xs text-gray-500">{parcel.senderPhone}</p>
                    </td>
                    <td className="p-4 text-gray-600">
                      <p className="font-semibold text-[#0A2533]">{parcel.receiverName}</p>
                      <p className="text-xs text-gray-500">{parcel.receiverPhone}</p>
                      <p className="text-xs text-gray-400">{parcel.receiverDistrict}</p>
                    </td>
                    <td className="p-4 font-semibold text-green-600 text-center">৳ {parcel.deliveryCharge}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${parcel.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {parcel.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="bg-primary hover:bg-green-500 transition-colors text-[#0A2533] font-semibold py-1.5 px-4 rounded-lg text-xs shadow-sm cursor-pointer">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-400 font-medium">No parcels found in the system.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
